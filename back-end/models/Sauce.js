const mongoose = require("mongoose");

//CREATION DU SCHEMA SAUCES
const sauceSchema = mongoose.Schema({
  userId: {
    // identifiant user
    type: String,
    required: true,
  },
  name: {
    // nom de la sauce
    type: String,
    required: true,
  },
  manufacturer: {
    // fabricant de la sauce
    type: String,
    required: true,
  },
  description: {
    // description de la sauce
    type: String,
    required: true,
  },
  mainPepper: {
    //principal ingrédient épicé de la sauce
    type: String,
    required: true,
  },
  imageUrl: {
    //l'URL de l'image de la sauce téléchargée par l'utilisateur
    type: String,
    required: true,
  },
  heat: {
    //nombre entre 1 et 10 décrivant la sauce
    type: Number,
    required: true,
  },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

module.exports = mongoose.model("Sauce", sauceSchema);