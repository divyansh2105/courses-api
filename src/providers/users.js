const {databaseConnector} = require('./databaseConnector');

const returningFields = 'username, first_name, last_name';

async function createUserProvider(keys, values) {
  const query = `insert into users(${keys}) values (${values}) returning ${returningFields};`;
  return databaseConnector.query(query);
}

async function getUserProvider(keys, username) {
  const query = `select ${keys} from users where username = '${username}';`;
  return databaseConnector.query(query);
}

async function updateUserProvider(keyValueString, username) {
  const query = `update users set ${keyValueString} where username='${username}' returning ${returningFields};`;
  return databaseConnector.query(query);
}

async function deleteUserProvider(username) {
  const query =  `delete from users where username='${username}';`;
  return databaseConnector.query(query);
}

module.exports = {getUserProvider, createUserProvider, updateUserProvider, deleteUserProvider};