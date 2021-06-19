const Thing = require('../models/Thing');

exports.newLike = (req, res, next) => {
    const like = req.body.likes;
    const dislikes = req.body.dislikes;
    const userLiked = req.body.userLiked;
    const userDisliked = req.body.userDisliked;

    Thing.findOne({ _id: req.params.id })

        .then(sauce => {
            
            switch (like) {
                case 1:
                    Thing.updateOne(
                        { _id: req.params.id },
                        { $push: { userLiked: userId }, $inc: { likes: +1 } }
                    )
                        .then(() => res.status(200).json({ message: 'Liked' }))
                        .catch(error => res.status(404).json({ message: 'Erreur ici l20' }));
                    break;
            }
            switch (dislikes) {
                case -1:
                    Thing.updateOne(
                        { _id: req.params.id },
                        { $push: { userDisliked: userId }, $inc: { dislikes: -1 } }
                    )
                        .then(() => res.status(200).json({ message: 'Disliked' }))
                        .catch(error => res.status(400).json({ message: 'Erreur ici l30' }));
                    break;
            }
        })
        .catch(error => res.status(201).json({ error: error }))
};