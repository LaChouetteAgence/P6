// recuperation du modele sauce
const Sauce = require("../models/sauce");

// declaration de 'fs' pour la gestion des fichiers image des sauces
const fs = require("fs");

// REQUETES SAUCES

// creation sauce
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id; // on enleve le champs id genere du corps de la requete
  const sauce = new Sauce({
    ...sauceObject, // ...sauceObject premet de recuperer l'integralite du corps de la requete
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée !!" }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

// recuperer toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ error });
    });
};

// recuperer une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id }) // on recupere l'id correspondant à la demande et on verifie que celui-ci correspond à l'objet demandé
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => {
      console.log(error);
      res.status(404).json({ error });
    });
};

// modifier une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file // on verifie si l'image existe ou non
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  Sauce.findOne({ _id: req.params.id, userId: req.auth.userId })
    .then((sauce) => {
      if (!sauce) {
        res.status(404).json({ error: new Error("Objet non trouvé !") });
      }
      if (sauce.userId !== req.auth.userId) {
        return res
          .status(401)
          .json({ error: new Error("Requête non autorisée !") });
      }
      Sauce.updateOne(
        { _id: req.params.id },
        { ...sauceObject, _id: req.params.id }
      )
        .then(() => res.status(200).json({ message: "Sauce modifiée " }))
        .catch((error) => {
          console.log(error);
          res.status(400).json({ error });
        });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};

// effacer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id, userId: req.auth.userId })
    .then((sauce) => {
      if (!sauce) {
        res.status(404).json({ error: new Error("Objet non trouvé !") });
      }
      if (sauce.userId !== req.auth.userId) {
        return res
          .status(401)
          .json({ error: new Error("Requête non autorisée !") });
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
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error });
    });
};