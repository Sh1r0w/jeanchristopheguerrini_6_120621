const express = require('express');

const router = express.Router();

const Thing = require('../models/Thing');

router.post('/', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !'
    });
  });
  
  router.get('/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
    .then( thing => res.status(200).json(thing))
    .catch( error => res.status(404).json({ error }));
  });
  
  router.put('/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });
  
  router.delete('/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });
  


module.exports = router;