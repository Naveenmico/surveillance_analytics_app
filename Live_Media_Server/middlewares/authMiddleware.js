const JWT = require('jsonwebtoken');
const { SECERT_KEY } = require('../config/config');

const userAuth = async (req, res, next) => {
    try {
        console.log(req.headers)
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ success: false, message: 'Authorization header is missing' });
        }

        if (!authHeader.startsWith('Bearer')) {
            return res.status(401).json({ success: false, message: 'Invalid authorization format' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, message: 'Token is missing' });
        }

        const decoded = JWT.verify(token, SECERT_KEY);
        req.userId = decoded.id;
        next();
    } catch (error) {
        console.error('Error in userAuth middleware:', error);
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};

module.exports = userAuth;
