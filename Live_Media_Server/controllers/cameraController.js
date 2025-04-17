const {PATH} = require('../config/config')
const cameraModel = require("../models/cameraModel");
const fs = require('fs');
const path = require('path');

const cameraController = {
    getCameras: async (req, res) => {
        try {
            const camera = await cameraModel.getCameras();
            res.status(200).json({ status: true, statusCode: '200', camera });
        } catch (error) {
            console.error(`Error fetching camera details: ${error.message}`);
            res.status(500).json({ status: false, statusCode: '500', error: error.message });
        }

    },
    getCamera : async(req,res) => {
        //const {camera_id} = req.body;
        const camera_id = req.params.camera_id
        try{
            const camera = await cameraModel.getCamera(camera_id);
            res.status(200).json({status: true, statusCode:'200', camera});
        }catch(error){
            console.log(error);
            res.status(500).json({status:false, statusCode: '500', error: error.message})
        }
    },
    postCamera: async (req, res) => {
        const { camera_name, camera_id, camera_port, attribute } = req.body;
        try {
            const newCamera = await cameraModel.postCamera(camera_id, camera_port, camera_name, attribute);
            res.json({
                status: true,
                statusCode: 200,
                msg: `Successfully added camera id ${newCamera.result[0].camera_id}`,
                newCamera,
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                statusCode: 500,
                error: error.message,
            });
        }
    },
    editCamera : async (req, res) => {
        const camera_id = req.params.camera_id
        const { camera_port, camera_name, attribute } = req.body;
        try {
          const updatedCamera = await cameraModel.editCamera(camera_id,camera_port, camera_name, attribute);
          res.json({
            status: true,
            statusCode: 200,
            msg: `Successfully editted camera id ${camera_id}`,
            updatedCamera,
        });
        } catch (error) {
          res.status(500).json({ status: false, statusCode: '500', error: error.message });
        }
      },
    
    deleteCamera: async (req, res) => {
        const camera_id = req.params.id;
        try {
            const camera = await cameraModel.deleteCamera(camera_id);
            //console.log(camera);
            res.json({ status: true, statusCode: '200', msg: `Successfully deleted camera id ${camera.camera_id}`, camera });
        } catch (error) {
            res.status(500).json({ status: false, statusCode: '500', error: error.message });
        }
    },

    postImage: async (req, res) => {
        const { camera_id } = req.body;
        //console.log(req.body);
        const dirPath = PATH;
        try {
            // Check if the Images directory exists, create it if not
            var image = req.files.image;
            var base64Data = image.data.toString('base64');
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
                console.log('Directory created successfully');
            } else {
                console.log('Directory already exists');
            }
            // const base64Data = image.replace(/^data:image\/\w+;base64,/, '');

            setTimeout(() => {
                const imageBuffer = Buffer.from(base64Data, 'base64');
                const imgPath = path.join(dirPath, `${camera_id}.png`);
                fs.writeFileSync(imgPath, imageBuffer);
                res.json({ status: true, statusCode: '200', msg: `Successfully Added with ${camera_id}`, image });
            }, 3000)
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ status: false, statusCode: '500', error: error.message });
        }
    },

    getImage: async (req, res) => {
        const { camera_id } = req.params;
        const dirPath = PATH;

        try {
            const imgPath = path.join(dirPath, `${camera_id}.png`);

            // Check if the image file exists
            if (fs.existsSync(imgPath)) {
                // Read the image file
                const imageData = fs.readFileSync(imgPath);
                // Set the appropriate headers
                res.setHeader('Content-Type', 'image/png');
                res.setHeader('Content-Length', imageData.length);

                // Send the image data in the response
                res.end(imageData);
            } else {
                res.status(404).json({ status: false, statusCode: '404', msg: 'Image not found' });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ status: false, statusCode: '500', error: error.message });
        }
    },

    postRoi: async (req, res) => {
        const { camera_id, roi } = req.body;

        if (!camera_id || !roi) {
            return res.status(400).json({ error: 'Missing camera_name or roi parameter' });
        }

        try{
            const camera = await cameraModel.postRoi(roi,camera_id);
            res.status(200).json({ status: true, statusCode: '200', camera });
        } catch (error) {
            console.error(`Error fetching camera details: ${error.message}`);
            res.status(500).json({ status: false, statusCode: '500', error: error.message });
        }
    }

};

module.exports = cameraController;