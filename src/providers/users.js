const {databaseConnector} = require('./databaseConnector');
const {Users} = require('../constants');

const returningFields = `${Users.USERNAME}, ${Users.FIRST_NAME}, ${Users.LAST_NAME}, ${Users.PROFILE_PIC}`;

async function createUserProvider(keys, values, placeholderValues) {
  const query = `insert into users(${keys}) values(${placeholderValues}) returning ${returningFields}`;
  return databaseConnector.query(query, values);
}

async function getUserByFieldProvider(keys, getByValue, getByField) {
  const query = `select ${keys} from users where ${getByField} = '${getByValue}';`;
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

module.exports = {getUserByFieldProvider, createUserProvider, updateUserProvider, deleteUserProvider};