const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const { PORT } = require('./config/config');
const fileUpload = require('express-fileupload');
const cameraRoutes = require('./routes/cameraRoutes')
const authRoutes = require('./routes/authRoutes')
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({limit:'1000mb',extended: true }));
app.use(bodyParser.json({limit:'1000mb'}));

app.use(fileUpload());
app.use('/api/auth',authRoutes)
app.use('/api',cameraRoutes);
  

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});