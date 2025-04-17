const Pool = require('pg-pool');
const dbHandeler = require('../dbHandler/dbHandler')
const config = require('../config/config');
const db = new Pool(config.dbConnection);

const cameraModel = {
  getCameras: async () => {
    let cameras = null;
    cameras = (await dbHandeler.fetchData(config.QUERY.getCameras)).rows;
    return cameras;
  },

  getCamera: async(camera_id) => {
    let camera = null;
    camera = (await dbHandeler.fetchDataParameterized(config.QUERY.getCamera,[camera_id])).rows;
    return camera;
  },

  postCamera: async (camera_id, camera_port, camera_name, attribute) => {
    const values = [camera_id, camera_port, camera_name, attribute];
    const result = (await dbHandeler.fetchDataParameterized(config.QUERY.postCamera, values)).rows;

    const insertedCamera = {
      camera_id,
      camera_port,
      camera_name,
      attribute,
      created_at: new Date().toISOString(),
    };

    return {
      status: true,
      statusCode: 200,
      result: [insertedCamera],
    };
  },

  editCamera: async (camera_id, camera_port, camera_name, attribute) => {
    const result = (await dbHandeler.fetchDataParameterized(config.QUERY.editCamera, [camera_port, camera_name, attribute,camera_id])).rows;
    return result;
  },


  deleteCamera: async (camera_id) => {
    let camera = null;
    camera = (await dbHandeler.fetchDataParameterized(config.QUERY.deleteCamera, [camera_id])).rows;
    return camera;
  },

    postRoi: async (roi, camera_id) => {
      let camera = (await dbHandeler.fetchDataParameterized(config.QUERY.postRoi, [roi, camera_id])).rows;
      return camera;
    },

};

module.exports = cameraModel;