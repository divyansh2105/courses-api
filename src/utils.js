function createCommaSeperatedString(valuesArray, typeSensitive = false) {
  return valuesArray.reduce((acc, cur, index) => {
    if(typeSensitive && typeof cur === 'string') cur = `'${cur}'`;
    if(index < valuesArray.length-1) {
      return acc + `${cur}, `; 
    } else {
     return acc + cur;
    }
  }, '');
}

function createCommaSeperatedKeyValueString(valuesObject, typeSensitive = false) {
  return Object.keys(valuesObject).reduce((acc, cur, index) => {
    let key = cur, value = valuesObject[key];
    if(typeSensitive && typeof value === 'string') value = `'${value}'`;
    if(index < Object.keys(valuesObject).length-1) {
      return acc + `${key}=${value}, `; 
    } else {
     return acc + `${key}=${value}`;
    }
  }, '');
}

function camelToSnakeCase(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

function removeUndefinedProperties(obj) {
  Object.keys(obj).forEach(key => obj[key] === undefined && delete obj[key])
}

module.exports = {createCommaSeperatedString, camelToSnakeCase, removeUndefinedProperties, createCommaSeperatedKeyValueString}