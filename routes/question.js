const express = require('express');
const {getQuestion} = require('../controllers/questionController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all question routes
router.use(requireAuth);

// GET question
router.get('/question', getQuestion);

module.exports = router;