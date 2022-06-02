const passwordValidator = require("password-validator");

//CREATION DU SCHEMA PASSWORD
const passwordSchema = new passwordValidator();
passwordSchema
  .is()
  .min(8) // Minimum 8 caractères
  .is()
  .max(50) // Maximum 50 caractères
  .has()
  .uppercase() // Doit contenir majuscule
  .has()
  .lowercase() // Doit contenir minuscule
  .has()
  .digits(2) // Doit contenir au moins 2 chiffres
  .has()
  .not()
  .spaces() // Ne doit pas contenir d'espace
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123"]); // mot de passe black listés

module.exports = passwordSchema;