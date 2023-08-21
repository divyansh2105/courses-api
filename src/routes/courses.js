const express = require('express');
const router = express.Router();
const {getCoursesByField, insertCourse, updateCourse, deleteCourse, getAllCourses} = require('../controllers/courses');
const {authenticateToken} = require('../middlewares/auth');

router.use(express.json())

router.get('/:username', async (req, res) => {
  try {
    console.log('Get course by username request');
    const username = req.params.username;
    const response = await getCoursesByField(username);
    res.status(200).json(response);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.get('/', async (req, res) => {
  try {
    console.log('Get courses request');
    const response = await getAllCourses();
    res.status(200).json(response);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Add Course request');
    const {username, courseName, activeLessonId} = req.body;

    const response = await insertCourse({username, courseName, activeLessonId});
    res.status(201).json(response?.rows?.[0]);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.patch('/:id', authenticateToken, async (req, res) => {
  try {
    console.log('Update course request');
    const loggedInUser = req.user?.username; 
    const courseIdToUpdate = req.params.id;
    const {courseId, courseName, username, activeLessonId} = req.body;

    const courses = await getCoursesByField(courseIdToUpdate, 'course_id');

    if(courses[0]?.username != loggedInUser) {
      return res.status(401).json({message: 'Unauthorised user'});
    }
  
    const response = await updateCourse({courseId, courseName, username, activeLessonId}, courseIdToUpdate);
    res.status(200).json(response?.rows);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    console.log('Delete course request');
    const loggedInUser = req.user?.username;
    const courseId = req.params.id;

    const courses = await getCoursesByField(courseId, 'course_id');

    if(courses[0]?.username != loggedInUser) {
      return res.status(401).json({message: 'Unauthorised user'});
    }

    const response = await deleteCourse(courseId);
    res.status(204).json(response?.rows);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

module.exports = router;
