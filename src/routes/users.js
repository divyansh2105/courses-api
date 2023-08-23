const express = require('express');
const router = express.Router();
const {getUser, insertUser, updateUser, deleteUser} = require('../controllers/users');
const multer = require('multer');
const path = require('path');
const { BadRequest } = require('../errors');

router.use(express.json())
const uploadDirectory = path.join(__dirname, '..', '..', '/uploads');
const upload = multer({dest: uploadDirectory});

router.get('/:id', async (req, res, next) => {
  try {
    console.log('Get user by id request');
    const username = req.params.id;
    const response = await getUser(username);
    res.status(200).json(response?.rows?.[0]);
  } catch(error) {
    next(error);
  }
});

router.post('/', upload.single('profilePic'), async (req, res, next) => {
  try {
    console.log('Add user request');
    const {username, firstName, lastName, password} = req.body;
    const filepath = req?.file?.path;

    const response = await insertUser({username, firstName, lastName, password}, filepath);
    res.status(201).json(response?.rows[0]);
  } catch(error) {
    next(error);
  }
});

router.patch('/:id', upload.single('profilePic'), async (req, res, next) => {
  try {
    console.log('Update user request');
    const usernameToUpdate = req.params.id;
    const {username, firstName, lastName, password} = req.body;
    const filepath = req?.file?.path;

    const response = await updateUser({username, firstName, lastName, password}, usernameToUpdate, filepath);
    res.status(200).json(response?.rows[0]);
  } catch(error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    console.log('Delete user request');
    const username = req.params.id;
    const response = await deleteUser(username);
    res.status(204).json(response?.rows);
  } catch(error) {
    next(error);
  }
});

router.post('/replace-pic/:id', upload.single('profilePic'), async (req, res, next) => {
  try {
    console.log('Replace user profile pic request');
    const usernameToUpdate = req.params.id;
    const filepath = req?.file?.path;

    const response = await updateUser({}, usernameToUpdate, filepath);
    res.status(200).json(response?.rows[0]);
  } catch(error) {
    next(error);
  }
});

module.exports = router;
