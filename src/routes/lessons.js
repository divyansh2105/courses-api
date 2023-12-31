const express = require('express');
const router = express.Router();
const {insertLesson, updateLesson, deleteLesson, getAllLessons} = require('../controllers/lessons');

router.use(express.json())

router.get('/', async (req, res, next) => {
  try {
    console.log('Get lessons request');
    const response = await getAllLessons();
    res.status(200).json(response?.rows);
  } catch(error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log('Add Lesson request');
    const {lessonName, courseId, languageCode, lessonText} = req.body;

    const response = await insertLesson({lessonName, courseId, languageCode, lessonText});
    res.status(201).json(response?.rows[0]);
  } catch(error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    console.log('Update lesson request');
    const lessonIdToUpdate = req.params.id;
    const {lessonId, lessonName, courseId, languageCode, lessonText} = req.body;
  
    const response = await updateLesson({lessonId, lessonName, courseId, languageCode, lessonText}, lessonIdToUpdate);
    res.status(200).json(response?.rows?.[0]);
  } catch(error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    console.log('Delete lesson request');
    const lessonId = req.params.id;
    const response = await deleteLesson(lessonId);
    res.status(204).json(response?.rows);
  } catch(error) {
    next(error);
  }
});

module.exports = router;
