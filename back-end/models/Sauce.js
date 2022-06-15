const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const SauceSchema = mongoose.Schema({
    userId: { type: String, required: true },// identifiant user
    name: { type: String, required: true },// identifiant user
    manufacturer: { type: String, required: true }, // fabricant de la sauce
    description: { type: String, required: true }, // description de la sauce
    mainPepper: { type: String, required: true },//principal ingrédient épicé de la sauce
    imageUrl: { type: String, required: true },//l'URL de l'image de la sauce téléchargée par l'utilisateur
    heat: { type: Number, required: true }, //nombre entre 1 et 10 décrivant la sauce
    likes: { type: Number, required: true, default: 0 },
    dislikes: { type: Number, required: true, default: 0 },
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true },
});

SauceSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Sauce', SauceSchema);