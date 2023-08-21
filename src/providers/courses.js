const {databaseConnector} = require('./databaseConnector');

const returningFields = ['course_id', 'course_name', 'username', 'active_lesson_id'];

async function createCourseProvider(keys, values) {
  const query = `insert into courses(${keys}) values (${values}) returning ${returningFields};`;
  return databaseConnector.query(query);
}

async function getCourseProvider(keys, fieldValue, getByField) {
  const query = `select ${keys} from courses where ${getByField} = '${fieldValue}';`;
  return databaseConnector.query(query);
}

async function getAllCoursesProvider(keys) {
  const query = `select ${keys} from courses;`;
  return databaseConnector.query(query);
}

async function updateCourseProvider(keyValueString, courseId) {
  const query = `update courses set ${keyValueString} where course_id='${courseId}' returning ${returningFields};`;
  return databaseConnector.query(query);
}

async function deleteCourseProvider(courseId) {
  const query =  `delete from courses where course_id='${courseId}';`;
  return databaseConnector.query(query);
}

module.exports = {getCourseProvider, createCourseProvider, updateCourseProvider, deleteCourseProvider, getAllCoursesProvider};