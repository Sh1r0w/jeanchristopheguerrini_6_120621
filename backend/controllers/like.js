const Thing = require('../models/Thing');

exports.newLike = (req, res, next) => {
    let likes = req.body.like;
    let user = req.body.userId;


    if (likes === 1) {
        Thing.updateOne({ _id: req.params.id }, { $push: { usersLiked: user }, $inc: { likes: 1 }, _id: req.params.id })
            .then(() => res.status(201).json({ message: 'Like updated successfully!' })
            )
            .catch(error => {
                res.status(400).json({ error: error })
            });
    } else if (likes === -1) {
        Thing.updateOne({ _id: req.params.id }, { $push: { usersDisliked: user }, $inc: { dislikes: 1 } })
            .then(() => res.status(201).json({ message: 'Dislike updated successfully!' })
            )
            .catch(error => {
                res.status(400).json({ error: error })
            });
    } else if (likes === 0) {
        Thing.findOne({ _id: req.params.id })
            .then((thing) => {
                if (thing.usersLiked.find( user => user === user)) {
                    Thing.updateOne({ _id: req.params.id }, { $pull: { usersLiked: user }, $inc: { likes: -1 } })
                        .then(() => res.status(201).json({ message: 'Reset Like successfully!' })
                        )
                        .catch(error => {
                            res.status(400).json({ error: error })
                        });
                } else if (thing.usersDisliked.find( user => user === user)) {
                    Thing.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: user }, $inc: { dislikes: -1 } })
                        .then(() => res.status(201).json({ message: 'Reset Like successfully!' })
                        )
                        .catch(error => {
                            res.status(400).json({ error: error })
                        });
                }
            })
            .catch(error => res.status(400).json({ error: error })
            )};
    };