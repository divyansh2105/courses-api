const express = require('express');
const router = express.Router();
const {getUser, insertUser, updateUser, deleteUser} = require('../controllers/users');

router.use(express.json())

router.get('/:id', async (req, res) => {
  try {
    console.log('Get user by id request');
    const username = req.params.id;
    const response = await getUser(username);
    res.status(200).json(response?.rows);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.post('/', async (req, res) => {
  try {
    console.log('Add user request');
    const {username, firstName, lastName, password, profilePic} = req.body;

    const response = await insertUser({username, firstName, lastName, password, profilePic});
    res.status(201).json(response?.rows[0]);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.patch('/:id', async (req, res) => {
  try {
    console.log('Update user request');
    const usernameToUpdate = req.params.id;
    const {username, firstName, lastName, password, profilePic} = req.body;
  
    const response = await updateUser({username, firstName, lastName, password, profilePic}, usernameToUpdate);
    res.status(200).json(response?.rows[0]);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

router.delete('/:id', async (req, res) => {
  try {
    console.log('Delete user request');
    const username = req.params.id;
    const response = await deleteUser(username);
    res.status(204).json(response?.rows);
  } catch(error) {
    console.log(error);
    res.status(500).json({message: error.message});
  }
});

module.exports = router;
