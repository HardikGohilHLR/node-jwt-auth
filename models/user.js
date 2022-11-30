// Model - User
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please Enter Username.'],
        },
        email: {
            type: String,
            required: [true, 'Please Enter Email.'],
            lowercase: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please Enter a Password'],
            minlength: [6, 'Password must be of minimum 6 characters.'],
        },
        token: {
            type: String
        }
    },
    {
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
                delete ret.__v;
            },
        },
    }
);

const User = mongoose.model('user', userSchema);

module.exports = User;
