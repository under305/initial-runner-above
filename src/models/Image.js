const {Schema, model} = require('mongoose');

const ImageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = model('Image', ImageSchema);