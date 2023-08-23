const jwt = require('jsonwebtoken');
const { Unauthorised } = require('../errors');
require('dotenv').config()

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const accessToken = authHeader && authHeader.split(' ')[1];
    if (accessToken == null) {
      throw new Unauthorised('No access token found in headers');
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (error, tokenData) => {
      if (error) {
        return next(error);
      }
      req.user = tokenData;
      next();
    })
  } catch(error) {
    next(error);
  }
}

module.exports = { authenticateToken }
