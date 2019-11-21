const mongoose = require('mongoose');
const config = require('config');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const statusCode = require('../utils/statusCodes');

const Schema = mongoose.Schema;

const UserSubSchema = new mongoose.Schema({
    access: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    _id: false
});

const UserSchema = new Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 1,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    birthDate: {
        type: Date,
        required: true
    },
    createdDate: {
        type: Date
    },
    lastLogin: {
        type: Date
    },
    avatar: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    tokens: [UserSubSchema]
});

UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = 'auth';
    //TODO: Replace the '' to process.env.JWT_SECRET
    const token = jwt.sign({_id: user._id.toHexString(), access}, config.get("SECRET_KEY")).toString();
    user.tokens.push({access, token});

    return user.save()
        .then(() => {
            return token;
        });
};

UserSchema.methods.removeToken = function (token) {
    const user = this;
    return user.update({
        $pull: { //removes from the db by the criteria
            tokens: {token}
        }
    });
};

UserSchema.methods.updateLastLogin  = function () {
    const user = this;
    user.lastLogin = new Date();
    return user.save().then(() => {return user});
};

UserSchema.statics.findByToken = async function (token) {
    const User = this;
    return await jwt.verify(token, config.get("SECRET_KEY"), async (err, decoded) => {
        if(err) {
            return {
                status_code: statusCode.INVALID_TOKEN,
                error: true,
                msg: 'Invalid token'
            }
        }

        const user = await User.findOne({
            '_id': decoded._id,
            'tokens.token': token,
            'tokens.access': 'auth'
        });

        if (!user) {
            return {
                status_code: statusCode.USER_NOT_FOUND,
                data: 'User not found'
            };
        }

        user._doc['password'] = '';
        return {
            status_code: 0,
            data: user._doc
        }
    });
};

UserSchema.statics.findByCredentials = function (email, password) {
    const User = this;
    return User.findOne({email})
        .then(user => {
            if (!user) {
                return Promise.reject({
                    status_code: statusCode.USER_NOT_FOUND,
                    error: true,
                    msg: 'User not found'
                });
            }

        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {
                if (err) {
                    reject({
                        status_code: statusCode.LOGIN_FAILED,
                        data: 'Login failed'
                    })
                } else if (!res) {
                    resolve({
                        status_code: statusCode.PASSWORD_NOT_MATCH,
                        data: 'Wrong password'
                    })
                } else
                    resolve({
                        status_code: 0,
                        data: user
                    })
            });
        });
    });
};

// take the user password and hash it
UserSchema.pre('save', function (next) {
    const user = this;

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    } else { //if not modified
        next();
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = {User};
