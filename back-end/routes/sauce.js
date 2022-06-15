// require express
const express = require('express');
// on utilise la methode router d'express
const router = express.Router();
var multer = require('../middleware/multer-config');

// recuperation du sauce controller
const saucesCtrl = require('../controllers/sauces');
// recuperation des middlewares sauces
const auth = require('../middleware/auth');
const likeCtrl = require("../controllers/likeCtrl");

// ROUTES SAUCES

// creation sauce // POST /api/sauces
router.post('/', auth, multer.single('image'), saucesCtrl.create);
// recuperer toutes les sauces // GET /api/sauces
router.get('/', auth, saucesCtrl.getAll);
// recuperer une sauce // GET /api/sauces/:id
router.get('/:_id', auth, saucesCtrl.getOne);
// like dislike // POST /api/sauces/:id/like
router.post("/:id/like", auth, likeCtrl.likeSauce);
// effacer une sauce // DELETE /api/sauces/:id
router.delete('/:_id', auth, saucesCtrl.delete);
// modifier une sauces // PUT /api/sauces/:id
router.put('/:_id', auth, multer.single('image'), saucesCtrl.modify)



module.exports = router;