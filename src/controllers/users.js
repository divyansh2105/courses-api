const {
  getUserByFieldProvider,
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
const {Users, ErrorMessages} = require('../constants');

const bcrypt = require('bcrypt');
const { BadRequest } = require('../errors');

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

  if(!values.length) throw new BadRequest(ErrorMessages.MISSING_FIELDS);

  return createUserProvider(keysString, values, placeholderValues);
}

function getUser(username) {
  let keysString = createCommaSeperatedString([Users.USERNAME, Users.FIRST_NAME, Users.LAST_NAME, Users.PROFILE_PIC]);
  return getUserByFieldProvider(keysString, username, Users.USERNAME);
}

async function updateUser(user, username, filepath='') {
  const storedUser = await getUserByFieldProvider(Users.USERNAME, username, Users.USERNAME);
  if(!storedUser.rows.length) {
    throw new BadRequest(ErrorMessages.USER_NOT_EXIST);
  }
  
  const {values, placeholderString} = await transformToQueryStrings(user, filepath);

  if(!values.length) throw new BadRequest(ErrorMessages.MISSING_FIELDS);

  return updateUserProvider(placeholderString, values, username);
}

async function transformToQueryStrings(user, filepath) {
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
  return {values, placeholderString};
}

async function deleteUser(username) {
  const storedUser = await getUserByFieldProvider(Users.USERNAME, username, Users.USERNAME);
  if(!storedUser.rows.length) {
    throw new BadRequest(ErrorMessages.USER_NOT_EXIST);
  }
  return deleteUserProvider(username);
}

module.exports = {getUser, insertUser, updateUser, deleteUser};