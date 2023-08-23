const {databaseConnector} = require('./databaseConnector');

async function createLanguageProvider(keys, values) {
  const query = `insert into languages(${keys}) values (${values}) returning *;`;
  return databaseConnector.query(query);
}

async function getLanguagesProvider(keysString) {
  const query = `select ${keysString} from languages;`;
  return databaseConnector.query(query);
}

async function getLanguageByFieldProvider(keys, getByValue, getByField) {
  const query = `select ${keys} from languages where ${getByField}='${getByValue}';`;
  return databaseConnector.query(query);
}

async function updateLanguageProvider(keyValueString, code) {
  const query = `update languages set ${keyValueString} where language_code='${code}' returning *;`;
  return databaseConnector.query(query);
}

async function deleteLanguageProvider(code) {
  const query =  `delete from languages where language_code='${code}';`;
  return databaseConnector.query(query);
}

async function deleteAllLanguagesProvider() {
  const query =  `delete from languages;`;
  return databaseConnector.query(query);
}

module.exports = {getLanguagesProvider, createLanguageProvider, updateLanguageProvider, deleteLanguageProvider, deleteAllLanguagesProvider, getLanguageByFieldProvider};