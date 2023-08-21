const {databaseConnector} = require('./databaseConnector');

const returningFields = 'username, first_name, last_name, profile_pic';

async function createUserProvider(keys, values, placeholderValues) {
  const query = `insert into users(${keys}) values(${placeholderValues}) returning ${returningFields}`;
  return databaseConnector.query(query, values);
}

async function getUserProvider(keys, username) {
  const query = `select ${keys} from users where username = '${username}';`;
  return databaseConnector.query(query);
}

async function updateUserProvider(keyValueString, values, username) {
  const query = `update users set ${keyValueString} where username='${username}' returning ${returningFields};`;
  return databaseConnector.query(query, values);
}

async function deleteUserProvider(username) {
  const query =  `delete from users where username='${username}';`;
  return databaseConnector.query(query);
}

module.exports = {getUserProvider, createUserProvider, updateUserProvider, deleteUserProvider};