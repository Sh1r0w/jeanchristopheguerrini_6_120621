const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../models/User');
const CryptoJS = require("crypto-js");
const passwordValidator = require('password-validator');
const validator = require('validator');

//Mot de passe renforcer min 5 lettres max 100 1 majuscule 1 minuscule et 1 chiffre sans espace
const schema = new passwordValidator();

schema
  .is().min(5)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)
  .has().not().spaces();



//Création d'un utilisateur
exports.signup = (req, res, next) => {

  const mail = CryptoJS.HmacSHA256(req.body.email, '52648597').toString();
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      if (schema.validate(req.body.password) == true && validator.isEmail(req.body.email) == true) {
        const user = new User({
          email: mail,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      } else {
        console.log("Votre Mot de passe n'est pas valide")
      }
    })
    .catch(error => res.status(500).json({ error }));
};

//Connection d'un utilisateur
exports.login = (req, res, next) => {
  const mail = CryptoJS.HmacSHA256(req.body.email, '52648597').toString();
  User.findOne({ email: mail })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              '25564484164813483',
              { expiresIn: '12h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};