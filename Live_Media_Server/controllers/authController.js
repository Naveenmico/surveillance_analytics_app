const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SECERT_KEY } = require('../config/config')
const authModel = require('../models/authModel');
const authController = {
  registerUser: async (req, res) => {
    try {
      const { first_name, email, password } = req.body;

      // Validate inputs
      if (!first_name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await authModel.postRegister(first_name, email, hashedPassword);

      // Generate token
      const token = jwt.sign({ email: user.result.email, id: user.result._id }, SECERT_KEY, { expiresIn: '1h' });
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        user: {
          first_name: user.result.first_name,
          email: user.result.email,
        },
        token,
      });
    } catch (error) {
      throw error;
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Validate inputs
      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' });
      }
    
      const user = await authModel.postLogin(email);
      //console.log(password);
      //console.log(user.result.password)
      // Check if user exists
      if (!user || !user.result.password) {
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.result.password);
      //console.log(isPasswordValid)
      if (!isPasswordValid) {
        return res.status(400).json({ success: false, message: 'Invalid email or password' });
      }
      // Generate token
      const token = jwt.sign({ email: user.result.email, id: user.result._id }, SECERT_KEY, { expiresIn: '1h' });

      const options = {
        httpOnly: true,
        //httpOnly flag prevents the cookie from being accessed by JavaScript. This can help to protect the cookie from being stolen by malicious scripts.
        secure: true,
        //The secure flag tells the browser to only send the cookie over HTTPS connections. This can help to prevent the cookie from being intercepted by attackers.
        expires: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours in milliseconds
      };
      //console.log(res)
      // Set cookies and send the final response
      res.cookie("token",token,options);
      res.status(200)
        .json({
          success: true,
          message: 'Login successful',
          user: user,
          token,
        });
    } catch (error) {
      throw error;
    }
  },

};

module.exports = authController;
