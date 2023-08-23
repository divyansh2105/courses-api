const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const {getUserPasswordProvider, getUserRefreshTokenProvider} = require('../providers/auth');
const {updateUser} = require('../controllers/users');
const {BadRequest, Unauthorised, Forbidden} = require('../errors');

async function loginController(username, password) {
  if (!username || !password) {
    throw new BadRequest('username and password required');
  }
  // Authenticate User
  const response = await getUserPasswordProvider(username)
  if(!response?.rows.length) {
    throw new BadRequest('User doesnt exist');
  }

  const matches = await bcrypt.compare(password, response.rows[0].password);
  if(!matches) {
    throw new Error('Wrong password');
  }

  const accessToken = generateAccessToken({username});
  const refreshToken = jwt.sign({username}, process.env.REFRESH_TOKEN_SECRET); //Refresh tokens can also have an expiration time
  updateUser({refreshToken}, username);
  return { accessToken, refreshToken };
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

async function tokenController(refreshToken) {
  if (!refreshToken) {
    throw new Unauthorised('no refresh token found');
  }

  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (error, tokenData) => {
      try {
        if (error) return reject(error);
        const username = tokenData?.username;
        
        const response = await getUserRefreshTokenProvider(username);
        if(!response?.rows.length || response?.rows[0]?.refresh_token !== refreshToken) {
          reject(new Forbidden('Refresh token doesnt match, please login'));
          return;
        }
        const accessToken = generateAccessToken({ username: username });
        resolve({accessToken});
      } catch(error) {
        reject(error);
      }
    })
  })
}

async function logoutController(username) {
  return updateUser({refreshToken: null}, username);
}

module.exports = { loginController, tokenController, logoutController }
