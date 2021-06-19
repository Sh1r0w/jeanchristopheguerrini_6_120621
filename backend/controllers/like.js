const Thing = require('../models/Thing');

exports.newLike = (req, res, next) => {
    const like = req.body.likes;
    const dislikes = req.body.dislikes;

    Thing.updateOne({ _id: req.params.id })
        .then(sauce => {
           if(userId !== req.params.userLiked){
               const thing = req.file ?{ 
                ...JSON.parse(req.body.sauce),
                likes: like,
                userLiked: userId
            } : { ...req.body};
            Thing.updateOne({ _id: req.params.id }, { ...thing, _id: req.params.id })
                .then(() => res.status(201).json({ message: 'Thing updated successfully!' })
                )
                .catch(error => { res.status(400).json({ error: error })
                });

            } else if(userId !== req.params.userDisliked){
                
                    const things = req.file ? {
                        ...JSON.parse(req.body.sauce),
                        dislikes: dislikes,
                        userDisliked: userId,
                    } : { ...req.body};
                    Thing.updateOne({ _id: req.params.id }, { ...things, _id: req.params.id })
                .then(() => res.status(201).json({ message: 'Thing updated successfully!' })
                )
                .catch(error => res.status(400).json({ error: error }));
                
            }
        })
        .catch(error => res.status(201).json({ error: error }))
};