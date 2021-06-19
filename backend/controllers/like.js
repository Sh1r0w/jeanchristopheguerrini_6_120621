const Thing = require('../models/Thing');

exports.newLike = (req, res, next) => {
    const like = req.body.likes;
    const dislikes = req.body.dislikes;
    const user = req.body.userId;
    const  likeModify = req.body.sauce;

    Thing.findOne({ _id: req.params.id })

        .then(sauce => {
           if(userId !== req.params.userLiked){
           {
               const thing = new Thing({ 
                likeModify,
                likes: like,
                userLiked: userId
            });
            thing.save()
                .then(() => res.status(201).json({ message: 'Sauce Enregistré !' }))
                .catch((error) => res.status(400).json({ error: error }));
            };
            } else if(userId !== req.params.userDisliked){
                {
                    const things = new Thing({
                        likeModify,
                        dislikes: dislikes,
                        userDisliked: userId,
                    })
                    things.save()
                .then(() => res.status(201).json({ message: 'Sauce Enregistré !' }))
                .catch((error) => res.status(400).json({ error: error }));
                };
            }
        })
        .catch(error => res.status(201).json({ error: error }))
};