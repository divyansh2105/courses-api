const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const {getUserPasswordProvider, getUserRefreshTokenProvider} = require('../providers/auth');
const {updateUser} = require('../controllers/users');

async function loginController(req) {
  // Authenticate User
  const {username, password} = req.body;
  const response = await getUserPasswordProvider(username)
  if(!response?.rows.length) {
    throw new Error('User doesnt exist');
    // return res.status(400).json({ msg: "User not exist" })
  }

  const matches = await bcrypt.compare(password, response.rows[0].password);
  if(!matches) {
    throw new Error('Wrong password');
  }

  const accessToken = generateAccessToken({username});
  const refreshToken = jwt.sign({username}, process.env.REFRESH_TOKEN_SECRET);
  updateUser({refreshToken}, username);
  return { accessToken, refreshToken };
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

async function tokenController(req) {
  const {token: refreshToken} = req.body;
  if (!refreshToken == null) {
    throw new Error('no refresh token found');
    //return res.sendStatus(401)
  }

  return new Promise((resolve, reject) => {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (error, tokenData) => {
      try {
        if (error) return reject(error);
        const username = tokenData?.username;
        
        const response = await getUserRefreshTokenProvider(username);
        if(!response?.rows.length || response?.rows[0]?.refresh_token !== refreshToken) {
          //status 403
          reject(new Error('Refresh token doesnt match, please login'));
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

module.exports = { loginController, tokenController }
