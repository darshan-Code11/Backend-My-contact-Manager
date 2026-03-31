const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentUser } = require('../controllers/UserController');
const validateToken = require('../middleWare/validateTokenHandler');

router.post('/login', loginUser);

router.post('/register', registerUser);

// Middleware comes FIRST, then the controller! Also it's usually a GET request.
// Using router.all so it works whether you use GET or POST in Postman!
router.all('/current', validateToken, getCurrentUser);


module.exports = router;