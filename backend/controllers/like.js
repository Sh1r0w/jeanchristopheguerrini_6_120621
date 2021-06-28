const Sauce = require('../models/Sauce');

// Gestion des Likes & Dislikes


exports.newLike = (req, res, next) => {
    let likes = req.body.like;
    let user = req.body.userId;

    // Ajout du like et de l'userId
    if (likes === 1) {
        Sauce.updateOne({ _id: req.params.id }, { $push: { usersLiked: user }, $inc: { likes: 1 }, _id: req.params.id })
            .then(() => res.status(201).json({ message: 'Like updated successfully!' })
            )
            .catch(error => {
                res.status(400).json({ error: error })
            });

        // Ajout du dislike et de l'userId
    } else if (likes === -1) {
        Sauce.updateOne({ _id: req.params.id }, { $push: { usersDisliked: user }, $inc: { dislikes: 1 } })
            .then(() => res.status(201).json({ message: 'Dislike updated successfully!' })
            )
            .catch(error => {
                res.status(400).json({ error: error })
            });

    } else if (likes === 0) {
        Sauce.findOne({ _id: req.params.id })
            .then((sauce) => {
                // retrait du like et de l'userId
                if (sauce.usersLiked.find(users => users === user)) {
                    Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: user }, $inc: { likes: -1 } })
                        .then(() => res.status(201).json({ message: 'Reset Like successfully!' })
                        )
                        .catch(error => {
                            res.status(400).json({ error: error })
                        });
                    // retrait du dislike et de l'userId
                } else if (sauce.usersDisliked.find(users => users === user)) {
                    Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: user }, $inc: { dislikes: -1 } })
                        .then(() => res.status(201).json({ message: 'Reset Like successfully!' })
                        )
                        .catch(error => {
                            res.status(400).json({ error: error })
                        });
                }
            })
            .catch(error => res.status(400).json({ error: error })
            )
    };
};