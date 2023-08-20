const {
  getLessonProvider,
  createLessonProvider,
  updateLessonProvider,
  deleteLessonProvider,
  getAllLessonsProvider,
  getLessonsByCourseIdProvider
} = require('../providers/lessons');

const {
  createCommaSeperatedString,
  camelToSnakeCase,
  removeUndefinedProperties,
  createCommaSeperatedKeyValueString
} = require('../utils');

const bcrypt = require('bcrypt');

async function insertLesson(lesson) {
  removeUndefinedProperties(lesson);

  let keysString = createCommaSeperatedString(Object.keys(lesson));
  keysString = camelToSnakeCase(keysString);

  const valuesString = createCommaSeperatedString(Object.keys(lesson).map(key => lesson[key]), true);
  if(!valuesString) return;
  return createLessonProvider(keysString, valuesString);
}

async function getLessonsByCourseId(courseId, isOrdered = false) {
  let keysString = createCommaSeperatedString(['lesson_id' ,'lesson_name', 'course_id', 'language_code', 'lesson_text']);
  return getLessonsByCourseIdProvider(keysString, courseId, isOrdered);
}

function getAllLessons() {
  let keysString = createCommaSeperatedString(['lesson_id' ,'lesson_name', 'course_id', 'language_code', 'lesson_text']);
  return getAllLessonsProvider(keysString);
}

async function updateLesson(lesson, lessonId) {
  removeUndefinedProperties(lesson);

  Object.keys(lesson).forEach(key => {
    key !== camelToSnakeCase(key) && delete Object.assign(lesson, {[camelToSnakeCase(key)]: lesson[key] })[key]; //update all keys from camelcase to snake case
  })

  let keyValueString = createCommaSeperatedKeyValueString(lesson, true);
  if(!keyValueString) return;
  return updateLessonProvider(keyValueString, lessonId);
}

function deleteLesson(lessonId) {
  return deleteLessonProvider(lessonId);
}

module.exports = {getLessonsByCourseId, insertLesson, updateLesson, deleteLesson, getAllLessons};