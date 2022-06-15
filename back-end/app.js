const express = require('express');
const app = express();
// const helmet = require("helmet");

const UserRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauce');

// app.use(helmet());


const mongoose = require('mongoose');
const db = {
    Name: 'hottakes',
    username: 'admin',
    password: 'm8LeV8o2MiL4zjLy',

}

// connecting to the data base
mongoose.connect('mongodb+srv://NordineS:Jnigxy9L7KsGwRf@cluster0.r1mlu.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
// CORS
app.use((req, res, next) => {
    const corsWhitelist = [
        'http://localhost:4200',
        'https://localhost:4200',
        'http://localhost:3000',
        'https://localhost:3000'
    ];

    if (corsWhitelist.indexOf(req.headers.origin) !== -1) {

        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    }
    next();
});
app.use(express.json());

//==================== Routes =======================
// on recupere nos routes
app.use('/api/auth', UserRoutes);
app.use('/api/sauces', saucesRoutes);
// Serve static files
app.use('/images', express.static(__dirname + '/images'));



// permet d'exporter l'app vers d'autres fichier
module.exports = app;