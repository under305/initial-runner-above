const {Schema, model} = require('mongoose');
 
const User = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    receivedImages: {
        type: [String],
        default: []
    }
});

module.exports = model('User',User);