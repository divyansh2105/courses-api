const express = require('express');
const router = express.Router();

const { loginController, tokenController } = require('../controllers/auth');

router.use(express.json())

router.post('/login', async (req, res) => {
  try {
    console.log('User login request');
    const { accessToken, refreshToken } = await loginController(req);
    res.status(200).json({ accessToken, refreshToken })
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.post('/token', async (req, res) => {
  try {
    console.log('Token request');
    const {accessToken} = await tokenController(req);
    res.status(200).json({ accessToken })
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

module.exports = router;
