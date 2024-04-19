const express = require('express')

// controller functions
const { loginUser, signupUser, updateUserScore, getUserInfo, getAllUsers } = require('../controllers/userController')
const requireAuth = require('../middleware/requireAuth');
const router = express.Router()



// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

//update score route
router.put('/score', requireAuth, updateUserScore);

// get user information route
router.get('/info', requireAuth, getUserInfo);

// get all users information
router.get('/allinfo', getAllUsers);

module.exports = router;