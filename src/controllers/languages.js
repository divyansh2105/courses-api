const {
  getLanguagesProvider,
  createLanguageProvider,
  updateLanguageProvider,
  deleteLanguageProvider,
  deleteAllLanguagesProvider
} = require('../providers/languages');

const {
  createCommaSeperatedString,
  camelToSnakeCase,
  removeUndefinedProperties,
  createCommaSeperatedKeyValueString
} = require('../utils');

function insertLanguage(language) {
  removeUndefinedProperties(language);
  let keysString = createCommaSeperatedString(Object.keys(language));
  keysString = camelToSnakeCase(keysString);

  const valuesString = createCommaSeperatedString(Object.keys(language).map(key => language[key]), true);
  if(!valuesString) return;
  return createLanguageProvider(keysString, valuesString);
}

function getLanguages() {
  let keysString = createCommaSeperatedString(['language_code, language_name']);
  return getLanguagesProvider(keysString);
}

function updateLanguage(language, code) {
  removeUndefinedProperties(language);

  Object.keys(language).forEach(key => {
    key !== camelToSnakeCase(key) && delete Object.assign(language, {[camelToSnakeCase(key)]: language[key] })[key]; //update all keys from camelcase to snake case
  })

  let keyValueString = createCommaSeperatedKeyValueString(language, true);
  if(!keyValueString) return;
  return updateLanguageProvider(keyValueString, code);
}

function deleteLanguage(code) {
  return deleteLanguageProvider(code);
}

function deleteAllLanguages() {
  return deleteAllLanguagesProvider();
}

module.exports = {getLanguages, insertLanguage, updateLanguage, deleteLanguage, deleteAllLanguages};