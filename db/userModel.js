const mongoose = require('mongoose');
const schema = mongoose.Schema;

//Schema
const userSchema = new schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    favourites: {
        type: [schema.Types.ObjectId],
        ref: 'item'
    },
    soldItems: {
        type: [schema.Types.ObjectId],
        ref: 'item'
    },
    mobile: {
        type: Number
    },
    notifications: [{
        message: String,
        userName: String,
        userEmail: String,
        mobile: Number,
        read: {
            type: Boolean,
            default: false
        },
        date:{
            type:Date,
            default: Date.now
        }
    }]
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;