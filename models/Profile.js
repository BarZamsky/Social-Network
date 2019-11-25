const mongoose = require('mongoose');
const config = require('config');
const validator = require('validator');
const _ = require('lodash');
const statusCode = require('../utils/statusCodes');

const Schema = mongoose.Schema;

const ExperienceSubSchema = new mongoose.Schema({
    jobTitle: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    current: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    },
    _id: false
});

const EducationSubSchema = new mongoose.Schema({
    university: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    field: {
        type: String,
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    current: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    },
    _id: false
});

const SocialSubSchema = new mongoose.Schema({
    github: {
        type: String
    },
    website: {
        type: String
    },
    _id: false
});

const AvatarSchema = new mongoose.Schema({
    imageName: {
        type: String,
        default: "none",
        required: true
    },
    imageData: {
        type: String,
        required: true
    }
});

const ProfileSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    avatar: AvatarSchema,
    userName: {
        type: String
    },
    title: {
        type: String
    },
    companyName: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    about: {
        type: String
    },
    experience: [ExperienceSubSchema],
    education: [EducationSubSchema],
    social: SocialSubSchema
});

ProfileSchema.methods.toJSON = function () {
    const profile = this;
    return profile.toObject();
};

ProfileSchema.methods.updateEducation = function (education) {
    const profile = this;
    profile.education.push(education);
    return profile.save()
        .then(() => {
            return profile._doc;
        })
};

ProfileSchema.methods.updateExperience = function (experience) {
    const profile = this;
    profile.experience.push(experience);
    return profile.save()
        .then(() => {
            return profile._doc;
        })
};

ProfileSchema.methods.updateSocial = function (socialData) {
    const profile = this;
    profile.social.push(socialData);
    return profile.save()
        .then(() => {
            return profile._doc;
        })
};

ProfileSchema.methods.updateAbout = function (about) {
    const profile = this;
    profile.about = about;
    return profile.save()
        .then(() => {
            return profile._doc;
        })
};


ProfileSchema.methods.setAvatar = function (imageName, path) {
    const profile = this;
    profile.avatar = {
        imageName:imageName,
        imageData:path
    };
    return profile.save()
        .then(() => {
            return profile._doc;
        });
};

ProfileSchema.statics.getProfile = function (userId) {
    const profile = this;
    return profile.findOne({user: userId})
        .then(profile => {
            return profile;
        })
};

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = {Profile};