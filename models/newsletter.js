const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    }
});

const newsletterSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        default: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    comments: [commentSchema],
    writers: [{
        type: Schema.Types.ObjectId,
        ref: `Writer`,
        required: true
    }]
});

newsletterSchema.pre(`save`, function (next) {
    if (this.isModified()) this.updated = Date.now();
    this.slug = this.title.split(' ').join('-').toLowerCase();
    next();
});

const Newsletter = mongoose.model('Newsletter', newsletterSchema);
module.exports = Newsletter;
