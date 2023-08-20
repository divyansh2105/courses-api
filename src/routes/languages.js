const express = require('express');
const router = express.Router();
const {getLanguages, insertLanguage, updateLanguage, deleteLanguage, deleteAllLanguages} = require('../controllers/languages.js');

router.use(express.json())

router.get('/', async (req, res) => {
  try {
    console.log('Get language request');
    const response = await getLanguages();
    res.status(200).json(response.rows);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Add language request');
    const {languageName, languageCode} = req.body;

    const response = await insertLanguage({languageName, languageCode});
    res.status(201).json(response.rows[0]);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.patch('/:code', async (req, res) => {
  try {
    console.log('Patch update language request');
    const languageCodeToUpdate =req.params.code;
    const {languageName, languageCode} = req.body;
    const response = await updateLanguage({languageName, languageCode}, languageCodeToUpdate);
    res.status(200).json(response.rows[0]);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.put('/:code', async (req, res) => {
  try {
    console.log('Put update language request');
    const languageCodeToUpdate =req.params.code;
    const {languageName, languageCode} = req.body;

    if(!languageName || !languageCode) {
      throw new Error('Required fields are missing');
    }

    const response = await updateLanguage({languageName, languageCode}, languageCodeToUpdate);
    res.status(200).json(response.rows[0]);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.delete('/:code', async (req, res) => {
  try {
    console.log('Delete language by code request');
    const code =req.params.code;
    const response = await deleteLanguage(code);
    res.status(204).json(response.rows);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.delete('', async (req, res) => {
  try {
    console.log('Delete all languages request');
    const response = await deleteAllLanguages();
    res.status(204).json(response.rows);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

module.exports = router;
