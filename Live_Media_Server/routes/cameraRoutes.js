const express = require('express');
const cameraController = require('../controllers/cameraController');
const userAuth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/add',cameraController.postCamera);
router.get('/camera/:camera_id',cameraController.getCamera);
router.put('/edit/:camera_id',cameraController.editCamera)
router.get('/image/:camera_id',cameraController.getImage);
router.get('/cameras',cameraController.getCameras);
router.delete('/delete/:id',cameraController.deleteCamera);
router.post('/image',cameraController.postImage);
router.put('/roi',cameraController.postRoi);


module.exports = router;