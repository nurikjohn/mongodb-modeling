const mongoose = require('mongoose');

const featuredPostsSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    posts: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Post',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('FeaturedPosts', featuredPostsSchema);
