const express = require('express');
const router = express.Router();
const {getLanguages, insertLanguage, updateLanguage, deleteLanguage, deleteAllLanguages} = require('../controllers/languages.js');
const { BadRequest } = require('../errors.js');

router.use(express.json())

router.get('/', async (req, res, next) => {
  try {
    console.log('Get language request');
    const response = await getLanguages();
    res.status(200).json(response?.rows);
  } catch(error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log('Add language request');
    const {languageName, languageCode} = req.body;

    const response = await insertLanguage({languageName, languageCode});
    res.status(201).json(response?.rows[0]);
  } catch(error) {
    next(error);
  }
});

router.patch('/:code', async (req, res, next) => {
  try {
    console.log('Patch update language request');
    const languageCodeToUpdate =req.params.code;
    const {languageName, languageCode} = req.body;
    const response = await updateLanguage({languageName, languageCode}, languageCodeToUpdate);
    res.status(200).json(response?.rows[0]);
  } catch(error) {
    next(error);
  }
});

router.put('/:code', async (req, res, next) => {
  try {
    console.log('Put update language request');
    const languageCodeToUpdate =req.params.code;
    const {languageName, languageCode} = req.body;

    if(!languageName || !languageCode) {
      throw new BadRequest('Required fields are missing');
    }

    const response = await updateLanguage({languageName, languageCode}, languageCodeToUpdate);
    res.status(200).json(response?.rows?.[0]);
  } catch(error) {
    next(error);
  }
});

router.delete('/:code', async (req, res, next) => {
  try {
    console.log('Delete language by code request');
    const code =req.params.code;
    const response = await deleteLanguage(code);
    res.status(204).json(response?.rows);
  } catch(error) {
    next(error);
  }
});

router.delete('', async (req, res, next) => {
  try {
    console.log('Delete all languages request');
    const response = await deleteAllLanguages();
    res.status(204).json(response?.rows);
  } catch(error) {
    next(error);
  }
});

module.exports = router;
