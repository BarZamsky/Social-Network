const express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    {Profile} = require('../../models/Profile'),
    statusCodes = require('../../utils/statusCodes'),
    {createResponse, createErrorResponse} = require('../../utils/createServerResponse'),
    {stringToDate} = require('../../utils/dateUtils'),
    mongoose = require('mongoose'),
    ObjectId = mongoose.Schema.Types.objectId;

// initial user's profile
router.post('/', async (req, res) => {
    try {
        const body = _.pick(req.body, ['user', 'userName', 'title', 'about']);
        const profile = new Profile(body);
        await profile.save();
        res.send(createResponse(0, profile));
    } catch (e) {
        res.status(400).send(createErrorResponse(statusCodes.ERROR, e.message));
    }
});

router.post('/education', async (req, res) => {
    try {
        const userId = _.pick(req.body, ['user']);
        let profile = await Profile.getProfile(userId['user']);
        if (!profile) {
            res.send(createResponse(statusCodes.PROFILE_NOT_FOUND, "No profile found for give user"));
            return;
        }

        const education = _.pick(req.body, ['university', 'degree', 'field', 'startDate', 'endDate', 'current', 'description']);
        education['startDate'] =  stringToDate(education['startDate'], "MM/yyyy", "/");
        education['endDate'] =  stringToDate(education['endDate'], "MM/yyyy", "/");
        profile = await profile.updateEducation(education);
        res.send(createResponse(0, profile));
    } catch (e) {
        res.status(400).send(createErrorResponse(statusCodes.ERROR, e.message));
    }
});

router.post('/experience', async (req, res) => {
    try {
        const userId = _.pick(req.body, ['user']);
        let profile = await Profile.getProfile(userId['user']);
        if (!profile) {
            res.send(createResponse(statusCodes.PROFILE_NOT_FOUND, "No profile found for give user"));
            return;
        }

        const experience = _.pick(req.body, ['jobTitle', 'company', 'country','city','startDate', 'endDate', 'current', 'description']);
        experience['startDate'] =  stringToDate(experience['startDate'], "MM/yyyy", "/");
        if (experience['endDate'])
            experience['endDate'] =  stringToDate(experience['endDate'], "MM/yyyy", "/");
        profile = await profile.updateExperience(experience);
        res.send(createResponse(0, profile));
    } catch (e) {
        res.status(400).send(createErrorResponse(statusCodes.ERROR, e.message));
    }
});

module.exports = router;