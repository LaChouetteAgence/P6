// require express
const express = require("express");
// on utilise la methode router d'express
const router = express.Router();

// recuperation du sauce controller
const sauceCtrl = require("../controllers/sauceCtrl");
const likeCtrl = require("../controllers/likeCtrl");

// recuperation des middlewares sauces
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

// ROUTES SAUCES

// creation sauce // POST /api/sauces
router.post("/", auth, multer, sauceCtrl.createSauce);
// recuperer toutes les sauces // GET /api/sauces
router.get("/", auth, sauceCtrl.getAllSauces);
// recuperer une sauce // GET /api/sauces/:id
router.get("/:id", auth, sauceCtrl.getOneSauce);
// modifier une sauces // PUT /api/sauces/:id
router.put("/:id", auth, multer, sauceCtrl.modifySauce);
// effacer une sauce // DELETE /api/sauces/:id
router.delete("/:id", auth, sauceCtrl.deleteSauce);
// like dislike // POST /api/sauces/:id/like
router.post("/:id/like", auth, likeCtrl.likeSauce);

module.exports = router;