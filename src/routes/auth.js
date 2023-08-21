const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/auth');
const { loginController, tokenController, logoutController } = require('../controllers/auth');

router.use(express.json())

router.post('/login', async (req, res) => {
  try {
    console.log('User login request');
    const {username, password} = req.body;
    const { accessToken, refreshToken } = await loginController(username, password);
    res.status(200).json({ accessToken, refreshToken })
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.post('/token', async (req, res) => {
  try {
    console.log('Token request');
    const {token: refreshToken} = req.body;
    const {accessToken} = await tokenController(refreshToken);
    res.status(200).json({ accessToken })
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.post('/logout', authenticateToken, async (req, res) => {
  try {
    console.log('User Logout request');
    const loggedInUser = req.user?.username; 
  
    const response = await logoutController(loggedInUser);
    res.status(200).json(response?.rows)
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

module.exports = router;
