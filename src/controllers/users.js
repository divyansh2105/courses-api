const {
  getUserProvider,
  createUserProvider,
  updateUserProvider,
  deleteUserProvider
} = require('../providers/users');

const {
  createCommaSeperatedString,
  camelToSnakeCase,
  removeUndefinedProperties,
  createCommaSeperatedKeyValueString
} = require('../utils');

const bcrypt = require('bcrypt');

async function insertUser(user) {
  removeUndefinedProperties(user);
  if(user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  let keysString = createCommaSeperatedString(Object.keys(user));
  keysString = camelToSnakeCase(keysString);

  const valuesString = createCommaSeperatedString(Object.keys(user).map(key => user[key]), true);

  return createUserProvider(keysString, valuesString);
}

function getUser(username) {
  let keysString = createCommaSeperatedString(['username, first_name, last_name']);
  return getUserProvider(keysString, username);
}

async function updateUser(user, username) {
  removeUndefinedProperties(user);
  if(user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  Object.keys(user).forEach(key => {
    key !== camelToSnakeCase(key) && delete Object.assign(user, {[camelToSnakeCase(key)]: user[key] })[key]; //update all keys from camelcase to snake case
  })

  let keyValueString = createCommaSeperatedKeyValueString(user, true);
  return updateUserProvider(keyValueString, username);
}

function deleteUser(username) {
  return deleteUserProvider(username);
}

module.exports = {getUser, insertUser, updateUser, deleteUser};