const jwt = require('jsonwebtoken');
require('dotenv').config()

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization']
    const accessToken = authHeader && authHeader.split(' ')[1]
    if (accessToken == null) {
      throw new Error('No access token found in headers');
      //return res.sendStatus(401)
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, tokenData) => {
      if (error) {
        console.log(error);
        return res.status(403).json({message: error.message});
      }
      req.user = tokenData;
      next();
    })
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
}

module.exports = { authenticateToken }
