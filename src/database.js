const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL,{
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})
    .then(db=>console.log("Database is connected"))
    .catch(err=>console.log(err));