// require express
const express = require('express');
// on utilise la methode router d'express
const router = express.Router();

// recuperation du user controller
const userCtrl = require('../controllers/user');


// ROUTES USERS

// POST /api/auth/login
router.post('/login', userCtrl.login);
// POST /api/auth/signup
router.post('/signup', userCtrl.signup);

module.exports = router;