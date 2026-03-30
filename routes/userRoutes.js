const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentUser } = require('../controllers/UserController');

router.post('/login', loginUser);

router.post("/register", registerUser)
router.post("/current", getCurrentUser)

module.exports = router;    