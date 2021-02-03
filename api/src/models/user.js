const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
mongoose.set('useCreateIndex', true);

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank."],
        unique: true,
        match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
        index: true
    },
    name: {
        type: String,
        required: [true, "can't be blank."],
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "can't be blank."],
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    role: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: [true, "can't be blank."]
    },
    hash: {
        type: String,
        required: [true, "can't be blank."]
    }
});

UserSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 713, 512, 'sha512').toString('hex');
}

UserSchema.methods.isValidPassword = function(password) {
    let hash = crypto.pbkdf2Sync(password, this.salt, 713, 512, 'sha512').toString('hex');
    return this.hash === hash;
}

UserSchema.methods.generateJWT = function () {
    return jwt.sign({
        username: this.username,
        role: this.role
    },
    process.env.SECRET,
    {
        expiresIn: '1h'
    });
}

UserSchema.methods.toAuthJSON = function() {
    return {
        username: this.username,
        email: this.email,
        token: this.generateJWT(),
        role: this.role
    }
}

UserSchema.plugin(uniqueValidator, {
    message: 'is already taken.'
});

mongoose.model('User', UserSchema);

teste clone