const {
  getCourseProvider,
  createCourseProvider,
  updateCourseProvider,
  deleteCourseProvider,
  getAllCoursesProvider
} = require('../providers/courses');

const {
  createCommaSeperatedString,
  camelToSnakeCase,
  removeUndefinedProperties,
  createCommaSeperatedKeyValueString
} = require('../utils');

const bcrypt = require('bcrypt');

async function insertCourse(course) {
  removeUndefinedProperties(course);

  let keysString = createCommaSeperatedString(Object.keys(course));
  keysString = camelToSnakeCase(keysString);

  const valuesString = createCommaSeperatedString(Object.keys(course).map(key => course[key]), true);

  return createCourseProvider(keysString, valuesString);
}

function getCourse(username) {
  let keysString = createCommaSeperatedString(['course_id, course_name, username, active_lesson_id']);
  return getCourseProvider(keysString, username);
}

function getAllCourses() {
  let keysString = createCommaSeperatedString(['course_id, course_name, username, active_lesson_id']);
  return getAllCoursesProvider(keysString);
}

async function updateCourse(course, courseId) {
  removeUndefinedProperties(course);

  Object.keys(course).forEach(key => {
    key !== camelToSnakeCase(key) && delete Object.assign(course, {[camelToSnakeCase(key)]: course[key] })[key]; //update all keys from camelcase to snake case
  })

  let keyValueString = createCommaSeperatedKeyValueString(course, true);
  return updateCourseProvider(keyValueString, courseId);
}

function deleteCourse(courseId) {
  return deleteCourseProvider(courseId);
}

module.exports = {getCourse, insertCourse, updateCourse, deleteCourse, getAllCourses};