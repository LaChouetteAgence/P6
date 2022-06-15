// recuperation du modele sauce
const SauceSchema = require('../models/Sauce.js');

// declaration de 'fs' pour la gestion des fichiers image des sauces
const fs = require('fs');

// creation sauce

exports.create = (req, res, next) => {
    const dataSauce = JSON.parse(req.body.sauce);
    const NewSauce = new SauceSchema({
        ...dataSauce, // ...sauceObject premet de recuperer l'integralite du corps de la requete
    });
NewSauce.imageUrl = `${req.protocol}://${req.headers.host}/${req.file.path}`;
    

NewSauce.save().then(() => {
        res.status(201).json({
            message: 'Sauce enregistrée !!',
            newSauce: NewSauce
        });
    })
    .catch((error) => {
        res.status(400).json({
            error: error
        });
    });
};

exports.modify = (req, res, next) => {
    
    const dataSauce = req.file ?
      {
          ...JSON.parse(req.body.sauce),
          imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body }
      SauceSchema.findByIdAndUpdate(req.params._id, dataSauce, () => {
        res.status(200).json({ message: "Succes modifying sauce !" });
    })
}

exports.delete = (req, res) => {
    SauceSchema.findById(req.params._id).then(sauce => {
        if (sauce.userId !== req.auth) {
            return res.status(401).json({
                error: new Error('Unauthorized request!')
            });
        }
        const filename = sauce.imageUrl.split("/images")[1];
      fs.unlink(`images/${filename}`, () => {
        // une fois que le fichier est supprimé on supprime la sauce
        sauce
          .deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: "Votre sauce a été supprimée" });
          })

          .catch((error) => {
            console.log(error);
            res.status(400).json({ error });
          });
      });
    })

}
// recuperer toutes les sauces
exports.getAll = (req, res) => {
    SauceSchema.find()
        .then(data => {
            res.status(200).json(data);
        })
        // .catch(err => res.status(404).json({ error: "Impossible d'accéder a la base de données des sauces !", err }));
};

// recuperer une sauce
exports.getOne = (req, res) => {
    SauceSchema.findById(req.params._id)// on recupere l'id correspondant à la demande et on verifie que celui-ci correspond à l'objet demandé
        .then(data => res.status(200).json(data));
};
