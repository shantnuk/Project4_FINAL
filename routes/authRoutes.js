const express = require('express');
const router = express.Router();
const authController = require('../component/component_auth')

// as defined in the assignment
router.get('/login', authController.getLogin)
router.post('/login', authController.postLogin)
router.get('/register', authController.getRegister)
router.post('/register', authController.postRegister)


module.exports = router;
