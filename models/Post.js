const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
        set: (val) => Math.round(val * 10) / 10,
    },
    free: {
        type: Boolean,
        default: true,
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    category: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
        },
    ],
    tags: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Tag',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
});

postSchema.index({ price: 1, ratingsAverage: -1 });

module.exports = mongoose.model('Post', postSchema);
