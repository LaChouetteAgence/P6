// importation des outils
const express = require('express')
const bodyParser = require('body-parser'); 
const mongoose = require('mongoose');
const path = require("path");

// importation des routes que l'on met dans un index.js
const sauceRoute = require("./routes/sauceRoutes");
const userRoute = require("./routes/userRoutes");

// connecting to the data base
mongoose.connect('mongodb+srv://NordineS:Jnigxy9L7KsGwRf@cluster0.r1mlu.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// création de l'application express
const app = express();

// CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Prise en charge du JSON.  
app.use(bodyParser.json()); 

// Création d'un middleware qui va afficher le corps de la requête.  
app.use(function (req, res, next) {  
  console.log(req.body);
});

// Serve static files
app.use("/images", express.static(path.join(__dirname, "images")));

// on recupere nos routes
app.use('api/sauce', sauceRoute);
app.use('api/user', userRoute);

// permet d'exporter l'app vers d'autres fichier
module.exports = app ;