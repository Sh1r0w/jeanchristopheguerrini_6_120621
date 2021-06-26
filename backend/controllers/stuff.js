const Sauce = require('../models/Sauce');
const fs = require('fs');
const validator = require('validator');




// Création d'une sauce
exports.createSauce = (req, res, next) => {

  //suppresion de caractére spécifique
  const sauceObject = JSON.parse(validator.blacklist(req.body.sauce, '+=$`{}'));
  
  console.log ()
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: []
  });
  sauce.save()
    .then(() => res.status(201).json({ message: 'Sauce Enregistré !' }))
    .catch((error) => res.status(400).json({ error: error }));
};

//Affichage d'une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error: error }));
};

//Modification d'une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(validator.blacklist(req.body.sauce, '+=$`{}')),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,

    } : { ...req.body };

  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(201).json({ message: 'Sauce updated successfully!' })
    )
    .catch(error => { res.status(400).json({ error: error })
    });
};


//Suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};


//Affichage de toutes les sauces
exports.getAllStuff = (req, res, next) => {
  Sauce.find()
    .then(sauces => res.status(200).json(sauces)
    )
    .catch(error => res.status(400).json({ error: error }));
};