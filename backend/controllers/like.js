const Thing = require('../models/Thing');

exports.newLike = (req, res, next) => {
    let likes = req.body.like;
    const user = req.body.userId;
    const userLiked = req.params.usersLiked

    if(likes === 1 && !userLiked.find(usersLiked => usersLiked = user)){
  Thing.updateOne({ _id: req.params.id }, { $push:{usersLiked: user}, $inc: {likes: 1}})
    .then(() => res.status(201).json({ message: 'Like updated successfully!' })
    )
    .catch(error => { res.status(400).json({ error: error })
    });
    console.log(user)
}else if (likes === -1){
    Thing.updateOne({ _id: req.params.id }, { $push:{usersDisliked: user}, $inc: {dislikes: 1}})
    .then(() => res.status(201).json({ message: 'Dislike updated successfully!' })
    )
    .catch(error => { res.status(400).json({ error: error })
    });
} else {
    Thing.updateOne({ _id: req.params.id }, { $pull:{usersDisliked: user}, $pull: {usersLiked: user}, $inc: {dislikes: 1}})
    .then(() => res.status(201).json({ message: 'Reset Like successfully!' })
    )
    .catch(error => { res.status(400).json({ error: error })
    });
}
};