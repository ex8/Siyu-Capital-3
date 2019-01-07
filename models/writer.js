const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Newsletter = require('./newsletter');

const writerSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    twitter: {
        type: String
    },
    description: {
        type: String,
        required: true
    }
});

writerSchema.virtual(`name`).get(function () {
    return `${this.first_name} ${this.last_name}`;
});

writerSchema.virtual(`total`).get(function () {
    Newsletter
        .find({writer: this})
        .exec()
        .then(newsletters => {
            return newsletters.length;
        })
        .catch(err => console.error(err));
});

const Writer = mongoose.model(`Writer`, writerSchema);
module.exports = Writer;
