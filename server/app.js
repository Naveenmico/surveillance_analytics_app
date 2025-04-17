const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const {PORT} = require('./config/config');
const { Discovery, Cam } = require('onvif/promises');
const socketIo = require('socket.io');
const rtsp = require('rtsp-ffmpeg');
const cors = require('cors');
const dashboardRoutes = require('./routes/dashboardRoutes');
const CAMERA_IP = '10.33.1.106';  // Desired camera IP
const USERNAME = 'admin';
const PASSWORD = 'admin1234';

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: '*',  // Allows all origins. Change this to specific domains as needed.
      methods: ["GET", "POST"]
    }
  });

let camInstance;

app.use(cors())
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());



app.post('/move', async (req, res) => {
  const { x, y, zoom } = req.body;
  if (!camInstance) {
    return res.status(500).send('Camera not connected');
  }

  if (x < -1 || x > 1 || y < -1 || y > 1 || zoom < 0 || zoom > 1) {
    return res.status(400).send('Invalid move parameters');
  }
  
  try {
    await camInstance.absoluteMove({ x, y, zoom });
    res.send('Camera moved');
  } catch (error) {
    res.status(500).send('Error moving camera: ' + error.message);
  }
});

async function discoverAndConnect() {
  Discovery.on('device', async (cam) => {
    if (cam.hostname !== CAMERA_IP) {
      console.log(`Ignoring camera: ${cam.hostname}`);
      return;
    }

    try {
      cam.username = USERNAME;
      cam.password = PASSWORD;
      await cam.connect();
      camInstance = cam;

      const { uri } = await cam.getStreamUri({ protocol: 'RTSP' });
      const input = uri.replace('rtsp://', `rtsp://${cam.username}:${cam.password}@`);
      const stream = new rtsp.FFMpeg({ input, resolution: '768x432', quality: 3 });

      io.on('connection', (socket) => {
        const pipeStream = socket.emit.bind(socket, 'data');
        stream.on('data', pipeStream);
        stream.on('disconnect', () => {
          stream.removeListener('data', pipeStream);
        });
      });

      console.log(`Connected to camera: ${cam.hostname}`);
    } catch (error) {
      console.error('Failed to connect to the camera:', error);
    }
  });

  Discovery.on('error', (err) => {
    console.error('Discovery error:', err);
  });

  console.log('Probing for cameras...');
  Discovery.probe();
}

app.use('/api',dashboardRoutes);

discoverAndConnect();

// app.listen(PORT,()=>{
//     console.log(`App is listening on ${PORT}`)
// })

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
  
