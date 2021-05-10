const mongoose = require('mongoose');
const Post = require('./Post');

const feedbackSchema = new mongoose.Schema({
    feedback: {
        type: String,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
    },
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Post',
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

feedbackSchema.index({ post: 1, user: 1 }, { unique: true });

feedbackSchema.statics.calcAverageRatings = async function (postId) {
    const stats = await this.aggregate([
        {
            $match: { post: postId },
        },
        {
            $group: {
                _id: '$post',
                rating: { $avg: '$rating' },
            },
        },
    ]);

    if (stats.length > 0) {
        await Post.findByIdAndUpdate(postId, {
            rating: stats[0].rating,
        });
    } else {
        await Post.findByIdAndUpdate(postId, {
            rating: 0,
        });
    }
};

feedbackSchema.post('save', function () {
    this.constructor.calcAverageRatings(this.post);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
    this.doc = await this.findOne();
    next();
});

feedbackSchema.post(/^findOneAnd/, async function () {
    await this.doc.constructor.calcAverageRatings(this.doc.post);
});

module.exports = mongoose.model('Feedback', feedbackSchema);
