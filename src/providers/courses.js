const { Courses, Users, Lessons } = require('../constants');
const {databaseConnector} = require('./databaseConnector');

const returningFields = [Courses.COURSE_ID, Courses.COURSE_NAME, Users.USERNAME, Lessons.ACTIVE_LESSON_ID];

async function createCourseProvider(keys, values) {
  const query = `insert into courses(${keys}) values (${values}) returning ${returningFields};`;
  return databaseConnector.query(query);
}

async function getCourseByFieldProvider(keys, getByValue, getByField) {
  const query = `select ${keys} from courses where ${getByField} = '${getByValue}';`;
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

module.exports = {getCourseByFieldProvider, createCourseProvider, updateCourseProvider, deleteCourseProvider, getAllCoursesProvider};