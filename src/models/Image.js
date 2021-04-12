const {Schema, model} = require('mongoose');

const ImageSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    
    imageURL: {
        type: String,
        require: true
    }
}, {
    timestamps: true
});

module.exports = model('Image', ImageSchema);