// require express
const express = require("express");
// on utilise la methode router d'express
const router = express.Router();

// recuperation du user controller
const userCtrl = require("../controllers/userCtrl");

// recuperation des middlewares users
const passwordValidator = require("../middleware/passwordValidator");
const emailValidator = require("../middleware/emailValidator");
const limit = require("../middleware/limiter");

// ROUTES USERS

// POST /api/auth/signup
router.post("/signup", emailValidator, passwordValidator, userCtrl.signup);
// POST /api/auth/login
router.post("/login", limit.max, userCtrl.login);

module.exports = router;