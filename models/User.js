const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true,
    },
    role:{
        type:String,
        required: true,
    },
    gender:String
});

module.exports = mongoose.model('User', UserSchema);