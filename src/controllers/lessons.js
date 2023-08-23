const {
  createLessonProvider,
  updateLessonProvider,
  deleteLessonProvider,
  getAllLessonsProvider,
  getLessonsByFieldProvider
} = require('../providers/lessons');

const {
  createCommaSeperatedString,
  camelToSnakeCase,
  removeUndefinedProperties,
  createCommaSeperatedKeyValueString
} = require('../utils');

const { BadRequest } = require('../errors');
const { Lessons, Courses, Languages, ErrorMessages } = require('../constants');

async function insertLesson(lesson) {
  removeUndefinedProperties(lesson);

  let keysString = createCommaSeperatedString(Object.keys(lesson));
  keysString = camelToSnakeCase(keysString);

  const valuesString = createCommaSeperatedString(Object.keys(lesson).map(key => lesson[key]), true);
  if(!valuesString) throw new BadRequest(ErrorMessages.MISSING_FIELDS);
  return createLessonProvider(keysString, valuesString);
}

async function getLessonsByField(getByValue, getByField, isOrdered = false) {
  let keysString = createCommaSeperatedString([Lessons.LESSON_ID ,Lessons.LESSON_NAME, Courses.COURSE_ID, Languages.LANGUAGE_CODE, Lessons.LESSON_TEXT]);
  return getLessonsByFieldProvider(keysString, getByValue, getByField, isOrdered);
}

function getAllLessons() {
  let keysString = createCommaSeperatedString([Lessons.LESSON_ID ,Lessons.LESSON_NAME, Courses.COURSE_ID, Languages.LANGUAGE_CODE, Lessons.LESSON_TEXT]);
  return getAllLessonsProvider(keysString);
}

async function updateLesson(lesson, lessonId) {
  const response = await getLessonsByField(lessonId, Lessons.LESSON_ID);
  if(!response.rows.length) {
    throw new BadRequest(`Lesson doesn't exist`);
  }
  removeUndefinedProperties(lesson);

  Object.keys(lesson).forEach(key => {
    key !== camelToSnakeCase(key) && delete Object.assign(lesson, {[camelToSnakeCase(key)]: lesson[key] })[key]; //update all keys from camelcase to snake case
  })

  let keyValueString = createCommaSeperatedKeyValueString(lesson, true);
  if(!keyValueString) throw new BadRequest(ErrorMessages.MISSING_FIELDS);
  return updateLessonProvider(keyValueString, lessonId);
}

async function deleteLesson(lessonId) {
  const response = await getLessonsByField(lessonId, Lessons.LESSON_ID);
  if(!response.rows.length) {
    throw new BadRequest(`Lesson doesn't exist`);
  }
  return deleteLessonProvider(lessonId);
}

module.exports = {getLessonsByField, insertLesson, updateLesson, deleteLesson, getAllLessons};