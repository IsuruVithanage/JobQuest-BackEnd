const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['user', 'company', 'institute', 'admin'],
        default: 'user'
    },
    friendRequestsSent: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friendRequestsReceived: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('User', UserSchema);
