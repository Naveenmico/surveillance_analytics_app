const dbConnection = {
    user: "naveen",
    database: "node",
    host: "localhost",
    password: "naveen123",
    port: 5432,
};

const ffmpeg = '/opt/FFmpeg-n4.4.3/bin'

const QUERY = {
    getCameras: 'SELECT * FROM camera_details ORDER BY created_at DESC',
    getCamera : 'SELECT * FROM camera_details WHERE camera_id = $1',
    postCamera: 'INSERT INTO camera_details (camera_id, camera_port, camera_name, attribute, created_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP) RETURNING camera_id, created_at',
    deleteCamera : 'DELETE FROM camera_details WHERE camera_id = $1 RETURNING *',
    editCamera : 'UPDATE camera_details SET camera_port = $1, camera_name = $2, attribute = $3, created_at = CURRENT_TIMESTAMP WHERE camera_id = $4 RETURNING *, created_at',
    postRoi : 'UPDATE camera_details SET roi = $1 WHERE camera_id = $2 RETURNING *',
    postRegister : 'INSERT INTO users (first_name, email, password) VALUES ($1, $2, $3) RETURNING *',
    postLogin: 'SELECT * FROM users WHERE email = $1;'
}

const PORT = 8000;
const PATH = '/home/naveend/Downloads/dashboard/Live_Media_Server/img';
const SECERT_KEY = "himotherfucke"
module.exports = { dbConnection, PORT, QUERY, PATH , SECERT_KEY};