const express = require('express');
const router = express.Router();
const {getCoursesByField, insertCourse, updateCourse, deleteCourse, getAllCourses} = require('../controllers/courses');
const { BadRequest } = require('../errors');
const {authenticateToken} = require('../middlewares/auth');
const {Courses, Users} = require('../constants');

router.use(express.json())

router.get('/:username', async (req, res, next) => {
  try {
    console.log('Get course by username request');
    const username = req.params.username;
    const response = await getCoursesByField(username, Users.USERNAME);
    res.status(200).json(response);
  } catch(error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    console.log('Get courses request');
    const response = await getAllCourses();
    res.status(200).json(response);
  } catch(error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log('Add Course request');
    const {username, courseName, activeLessonId} = req.body;

    const response = await insertCourse({username, courseName, activeLessonId});
    res.status(201).json(response?.rows?.[0]);
  } catch(error) {
    next(error);
  }
});

router.patch('/:id', authenticateToken, async (req, res, next) => {
  try {
    console.log('Update course request');
    const loggedInUser = req.user?.username; 
    const courseIdToUpdate = req.params.id;
    const {courseId, courseName, username, activeLessonId} = req.body;

    const courses = await getCoursesByField(courseIdToUpdate, Courses.COURSE_ID);

    if(!courses.length) {
      throw new BadRequest('course doesnt exist');
    }

    if(courses[0]?.username != loggedInUser) {
      return res.status(401).json({message: 'Unauthorised user'});
    }
  
    const response = await updateCourse({courseId, courseName, username, activeLessonId}, courseIdToUpdate);
    res.status(200).json(response?.rows?.[0]);
  } catch(error) {
    next(error);
  }
});

router.delete('/:id', authenticateToken, async (req, res, next) => {
  try {
    console.log('Delete course request');
    const loggedInUser = req.user?.username;
    const courseId = req.params.id;

    const response = await deleteCourse(courseId, loggedInUser);
    res.status(204).json(response?.rows);
  } catch(error) {
    next(error);
  }
});

module.exports = router;
