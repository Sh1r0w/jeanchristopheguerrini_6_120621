const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');
const likeCtrl = require('../controllers/like');

//Création des routes pour les sauces
router.post('/', auth, multer, stuffCtrl.createSauce);
router.get('/', auth, stuffCtrl.getAllStuff);
router.get('/:id', auth, stuffCtrl.getOneSauce);
router.put('/:id', auth, multer, stuffCtrl.modifySauce);
router.delete('/:id', auth, stuffCtrl.deleteSauce);
router.post('/:id/like', auth, likeCtrl.newLike);  


module.exports = router;