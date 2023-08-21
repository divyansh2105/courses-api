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

const {getLessonsByCourseId} = require('./lessons');

const bcrypt = require('bcrypt');

async function insertCourse(course) {
  removeUndefinedProperties(course);

  let keysString = createCommaSeperatedString(Object.keys(course));
  keysString = camelToSnakeCase(keysString);

  const valuesString = createCommaSeperatedString(Object.keys(course).map(key => course[key]), true);
  if(!valuesString) return;
  return createCourseProvider(keysString, valuesString);
}

async function getCoursesByField(fieldValue, getByField='username') {
  let keysString = createCommaSeperatedString(['course_id, course_name, username, active_lesson_id']);
  const response = await getCourseProvider(keysString, fieldValue, getByField);
  const courses = response.rows;
  return addLessonsToCourses(courses);
}

async function getAllCourses() {
  let keysString = createCommaSeperatedString(['course_id, course_name, username, active_lesson_id']);
  const response = await getAllCoursesProvider(keysString);
  const courses = response.rows;
  return addLessonsToCourses(courses);
}

async function addLessonsToCourses(courses) {
  return Promise.all(courses.map(async (course) => {
    const lessons = await getLessonsByCourseId(course.course_id, true);
    return {...course, lessons: lessons.rows};
  }));
}

async function updateCourse(course, courseId) {
  removeUndefinedProperties(course);

  Object.keys(course).forEach(key => {
    key !== camelToSnakeCase(key) && delete Object.assign(course, {[camelToSnakeCase(key)]: course[key] })[key]; //update all keys from camelcase to snake case
  })

  let keyValueString = createCommaSeperatedKeyValueString(course, true);
  if(!keyValueString) return;
  return updateCourseProvider(keyValueString, courseId);
}

function deleteCourse(courseId) {
  return deleteCourseProvider(courseId);
}

module.exports = {getCoursesByField, insertCourse, updateCourse, deleteCourse, getAllCourses};