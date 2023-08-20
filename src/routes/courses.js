const express = require('express');
const router = express.Router();
const {getCourse, insertCourse, updateCourse, deleteCourse, getAllCourses} = require('../controllers/courses');

router.use(express.json())

router.get('/:username', async (req, res) => {
  try {
    console.log('Get course by username request');
    const username = req.params.username;
    const response = await getCourse(username);
    res.status(200).json(response.rows);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.get('/', async (req, res) => {
  try {
    console.log('Get courses request');
    const response = await getAllCourses();
    res.status(200).json(response.rows);
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
    res.status(201).json(response.rows[0]);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.patch('/:id', async (req, res) => {
  try {
    console.log('Uupdate course request');
    const courseIdToUpdate = req.params.id;
    const {courseId, courseName, username, activeLessonId} = req.body;
  
    const response = await updateCourse({courseId, courseName, username, activeLessonId}, courseIdToUpdate);
    res.status(200).json(response.rows);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    console.log('Delete course request');
    const courseId = req.params.id;
    const response = await deleteCourse(courseId);
    res.status(204).json(response.rows);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

module.exports = router;
