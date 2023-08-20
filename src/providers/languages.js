const {databaseConnector} = require('./databaseConnector');

async function createLanguageProvider(keys, values) {
  const query = `insert into languages(${keys}) values (${values});`;
  return databaseConnector.query(query);
}

async function getLanguagesProvider() {
  const query = 'select language_code, language_name from languages;';
  return databaseConnector.query(query);
}

async function updateLanguageProvider(keyValueString, code) {
  const query = `update languages set ${keyValueString} where language_code='${code}';`;
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

module.exports = {getLanguagesProvider, createLanguageProvider, updateLanguageProvider, deleteLanguageProvider, deleteAllLanguagesProvider};