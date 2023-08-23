const {
  getCourseByFieldProvider,
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

const {getLessonsByField} = require('./lessons');
const {BadRequest, Unauthorised} = require('../errors');
const { Courses, Users, Lessons, ErrorMessages } = require('../constants');

async function insertCourse(course) {
  removeUndefinedProperties(course);

  let keysString = createCommaSeperatedString(Object.keys(course));
  keysString = camelToSnakeCase(keysString);

  const valuesString = createCommaSeperatedString(Object.keys(course).map(key => course[key]), true);
  if(!valuesString) throw new BadRequest(ErrorMessages.MISSING_FIELDS);
  return createCourseProvider(keysString, valuesString);
}

async function getCoursesByField(getByValue, getByField) {
  let keysString = createCommaSeperatedString([Courses.COURSE_ID, Courses.COURSE_NAME, Users.USERNAME, Lessons.ACTIVE_LESSON_ID]);
  const response = await getCourseByFieldProvider(keysString, getByValue, getByField);
  const courses = response.rows;
  return addLessonsToCourses(courses);
}

async function getAllCourses() {
  let keysString = createCommaSeperatedString([Courses.COURSE_ID, Courses.COURSE_NAME, Users.USERNAME, Lessons.ACTIVE_LESSON_ID]);
  const response = await getAllCoursesProvider(keysString);
  const courses = response.rows;
  return addLessonsToCourses(courses);
}

async function addLessonsToCourses(courses) {
  return Promise.all(courses.map(async (course) => {
    const lessons = await getLessonsByField(course.course_id, Courses.COURSE_ID, true);
    return {...course, lessons: lessons.rows};
  }));
}

async function updateCourse(course, courseId) {
  const response = await getCourseByFieldProvider(Courses.COURSE_ID, courseId, Courses.COURSE_ID);
  if(!response.rows.length) {
    throw new BadRequest(`Course doesn't exist`);
  }

  removeUndefinedProperties(course);

  Object.keys(course).forEach(key => {
    key !== camelToSnakeCase(key) && delete Object.assign(course, {[camelToSnakeCase(key)]: course[key] })[key]; //update all keys from camelcase to snake case
  })

  let keyValueString = createCommaSeperatedKeyValueString(course, true);
  if(!keyValueString) throw new BadRequest(ErrorMessages.MISSING_FIELDS);;
  return updateCourseProvider(keyValueString, courseId);
}

async function deleteCourse(courseId, loggedInUser) {
  const response = await getCourseByFieldProvider(Courses.COURSE_ID, courseId, Courses.COURSE_ID);
  if(!response.rows.length) {
    throw new BadRequest(`Course doesn't exist`);
  }

  const courses = await getCoursesByField(courseId, Courses.COURSE_ID);
  if(courses[0]?.username != loggedInUser) {
    throw new Unauthorised('Unauthorised user');
  }
  return deleteCourseProvider(courseId);
}

module.exports = {getCoursesByField, insertCourse, updateCourse, deleteCourse, getAllCourses};