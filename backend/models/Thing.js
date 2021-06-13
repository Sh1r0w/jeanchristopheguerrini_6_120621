const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({
    userId: { type: String, required: true},
    name: { type: String, required: true},
    manufacturer: { type: String, required: true},
    description: { type: String, required: true},
    mainPepper: { type: String, required: true},
    imageUrl: { type: String, required: true},
    heat: { type: String, required: true},
    userLiked: { type: String },
    usersDisliked: { type: String }
});

module.exports = mongoose.model('Thing', thingSchema);