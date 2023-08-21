const {databaseConnector} = require('./databaseConnector');

async function getUserPasswordProvider(username) {
  const query = `select password from users where username='${username}'`;
  return databaseConnector.query(query);
}

async function getUserRefreshTokenProvider(username) {
  const query = `select refresh_token from users where username='${username}'`;
  return databaseConnector.query(query);
}

module.exports = {getUserPasswordProvider, getUserRefreshTokenProvider};