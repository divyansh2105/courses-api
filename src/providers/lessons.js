const { Lessons, Courses, Languages } = require('../constants');
const {databaseConnector} = require('./databaseConnector');

const returningFields = [Lessons.LESSON_NAME, Courses.COURSE_ID, Languages.LANGUAGE_CODE, Lessons.LESSON_TEXT, Lessons.LESSON_ID];

async function createLessonProvider(keys, values) {
  const query = `insert into lessons(${keys}) values (${values}) returning ${returningFields};`;
  return databaseConnector.query(query);
}

async function getLessonsByFieldProvider(keys, getByValue, getByField, isOrdered) {
  const orderedQuery = isOrdered ? 'order by lesson_id asc' : '';
  const query = `select ${keys} from lessons where ${getByField} = '${getByValue}' ${orderedQuery};`;
  return databaseConnector.query(query);
}

async function getAllLessonsProvider(keys) {
  const query = `select ${keys} from lessons;`;
  return databaseConnector.query(query);
}

async function updateLessonProvider(keyValueString, lessonId) {
  const query = `update lessons set ${keyValueString} where lesson_id='${lessonId}' returning ${returningFields};`;
  return databaseConnector.query(query);
}

async function deleteLessonProvider(lessonId) {
  const query =  `delete from lessons where lesson_id='${lessonId}';`;
  return databaseConnector.query(query);
}

module.exports = {createLessonProvider, updateLessonProvider, deleteLessonProvider, getAllLessonsProvider, getLessonsByFieldProvider};
