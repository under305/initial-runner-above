const {Schema, model} = require('mongoose');
 
const User = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    }
});

module.exports = model('User',User);