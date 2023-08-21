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
const fs = require('fs').promises;

const bcrypt = require('bcrypt');

async function insertUser(user, filepath) {
  let imageBuffer = null;
  removeUndefinedProperties(user);
  if(user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  if(filepath) {
    imageBuffer = await fs.readFile(filepath);
    fs.unlink(filepath);
    user.profilePic = imageBuffer
  }

  let keysString = createCommaSeperatedString(Object.keys(user));
  keysString = camelToSnakeCase(keysString);

  const values = Object.keys(user).map(key => user[key]);
  const placeholderValues = createCommaSeperatedString(values.map((v, index) => `$${index+1}`));
  if(!values.length) return;
  return createUserProvider(keysString, values, placeholderValues);
}

function getUser(username) {
  let keysString = createCommaSeperatedString(['username, first_name, last_name']);
  return getUserProvider(keysString, username);
}

async function updateUser(user, filepath, username) {
  let imageBuffer = null;
  removeUndefinedProperties(user);
  if(user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  if(filepath) {
    imageBuffer = await fs.readFile(filepath);
    fs.unlink(filepath);
    user.profilePic = imageBuffer
  }

  Object.keys(user).forEach(key => {
    key !== camelToSnakeCase(key) && delete Object.assign(user, {[camelToSnakeCase(key)]: user[key] })[key]; //update all keys from camelcase to snake case
  })

  const values = Object.keys(user).map(key => user[key]);
  let placeholderObject = {};
  Object.keys(user).forEach((key, index) => placeholderObject[key] = `$${index+1}`);

  const placeholderString = createCommaSeperatedKeyValueString(placeholderObject);
  if(!values.length) return;
  return updateUserProvider(placeholderString, values, username);
}

function deleteUser(username) {
  return deleteUserProvider(username);
}

module.exports = {getUser, insertUser, updateUser, deleteUser};