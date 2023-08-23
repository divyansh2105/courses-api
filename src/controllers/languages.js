const {
  getLanguagesProvider,
  createLanguageProvider,
  updateLanguageProvider,
  deleteLanguageProvider,
  deleteAllLanguagesProvider,
  getLanguageByFieldProvider
} = require('../providers/languages');

const {
  createCommaSeperatedString,
  camelToSnakeCase,
  removeUndefinedProperties,
  createCommaSeperatedKeyValueString
} = require('../utils');

const {BadRequest} = require('../errors');
const {Languages, ErrorMessages} = require('../constants');

function insertLanguage(language) {
  removeUndefinedProperties(language);
  let keysString = createCommaSeperatedString(Object.keys(language));
  keysString = camelToSnakeCase(keysString);

  const valuesString = createCommaSeperatedString(Object.keys(language).map(key => language[key]), true);
  if(!valuesString) throw new BadRequest(ErrorMessages.MISSING_FIELDS);
  return createLanguageProvider(keysString, valuesString);
}

function getLanguages() {
  let keysString = createCommaSeperatedString([Languages.LANGUAGE_CODE, Languages.LANGUAGE_NAME]);
  return getLanguagesProvider(keysString);
}

async function updateLanguage(language, code) {
  const response = await getLanguageByFieldProvider(Languages.LANGUAGE_CODE, code, Languages.LANGUAGE_CODE);
  if(!response.rows.length) {
    throw new BadRequest(`Language doesn't exist`);
  }
  removeUndefinedProperties(language);

  Object.keys(language).forEach(key => {
    key !== camelToSnakeCase(key) && delete Object.assign(language, {[camelToSnakeCase(key)]: language[key] })[key]; //update all keys from camelcase to snake case
  })

  let keyValueString = createCommaSeperatedKeyValueString(language, true);
  if(!keyValueString) throw new BadRequest(ErrorMessages.MISSING_FIELDS);
  return updateLanguageProvider(keyValueString, code);
}

async function deleteLanguage(code) {
  const response = await getLanguageByFieldProvider(Languages.LANGUAGE_CODE, code, Languages.LANGUAGE_CODE);
  if(!response.rows.length) {
    throw new BadRequest(`Language doesn't exist`);
  }
  return deleteLanguageProvider(code);
}

function deleteAllLanguages() {
  return deleteAllLanguagesProvider();
}

module.exports = {getLanguages, insertLanguage, updateLanguage, deleteLanguage, deleteAllLanguages};