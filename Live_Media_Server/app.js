const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const NodeMediaServer = require('node-media-server');
const Camdata = require(process.env.npm_config_media);
const { PORT } = require('./config/config');
const fileUpload = require('express-fileupload');
const cameraRoutes = require('./routes/cameraRoutes')
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
// const userAuth = require('./middlewares/authMiddleware');
const app = express();
app.use(cors());
app.use(cookieParser())
app.use(bodyParser.urlencoded({limit:'1000mb',extended: true }));
app.use(bodyParser.json({limit:'1000mb'}));

app.use(fileUpload());
//console.log(Camdata)
const config = {
  logType: 3, // 3 - Log everything (debug)
  rtmp: {
      port: process.env.npm_config_rtport,
      chunk_size: 60000,
      gop_cache: true,
      ping: 60,
      ping_timeout: 30
  },
  http: {
      port: process.env.npm_config_port,
      allow_origin: '*'
  },
  relay: {
      ffmpeg: '/opt/ffmpeg-4.4.3/bin/ffmpeg',
      tasks: Camdata.data
  },
  // https: {
  //   port: 8443,
  //   key:'/var/okean/bin/certs/epu002.key',
  //   cert:'/var/okean/bin/certs/epu002.crt',
  // }
};


var nms = new NodeMediaServer(config)
//console.log(config)
nms.run();
app.use('/api/auth',authRoutes)
app.use('/api',cameraRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});