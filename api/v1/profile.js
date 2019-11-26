const express = require('express'),
    router = express.Router(),
    logger = require("../../middleware/logger"),
    authenticate = require("../../middleware/authenticate"),
    _ = require('lodash'),
    {Profile} = require('../../models/Profile'),
    statusCodes = require('../../utils/statusCodes'),
    {createResponse, createErrorResponse} = require('../../utils/createServerResponse'),
    {stringToDate} = require('../../utils/dateUtils'),
    mongoose = require('mongoose');

// initial user's profile
router.post('/', authenticate, async (req, res) => {
    try {
        const userId = req['user']['_id'];
        const body = _.pick(req.body, ['userName', 'title', 'companyName','country', 'city']);
        let profile = await Profile.getProfile(userId);
        if (!profile) {
            const profile = new Profile(body);
            await profile.save();
            res.send(createResponse(0, profile));
        } else {
            profile = await profile.updateInfo(body);
            res.send(createResponse(0, profile));
        }
    } catch (e) {
        logger.error(e.message);
        res.status(200).send(createErrorResponse(statusCodes.ERROR, e.message));
    }
});

// GET profile
router.get('/', authenticate, async (req, res) => {
    try {
        const userId = req['user']['_id'];
        let profile = await Profile.getProfile(userId);
        if (!profile) {
            logger.debug("Profile not found for user "+ userId);
            res.send(createResponse(statusCodes.PROFILE_NOT_FOUND, "No profile found for give user"));
            return;
        }

        res.send(createResponse(0, profile._doc));
    } catch (e) {
        logger.error(e.message);
        res.status(200).send(createErrorResponse(statusCodes.ERROR, e.message));
    }
});

// update profile - Education section
router.post('/education', authenticate, async (req, res) => {
    try {
        const userId = req['user']['_id'];
        let profile = await Profile.getProfile(userId);
        if (!profile) {
            logger.debug("Profile not found for user "+ userId);
            res.send(createResponse(statusCodes.PROFILE_NOT_FOUND, "No profile found for give user"));
            return;
        }

        const education = _.pick(req.body, ['university', 'degree', 'field', 'startDate', 'endDate', 'current', 'description']);
        education['startDate'] =  stringToDate(education['startDate'], "MM/yyyy", "/");
        education['endDate'] =  stringToDate(education['endDate'], "MM/yyyy", "/");
        profile = await profile.updateEducation(education);
        res.send(createResponse(0, profile));
    } catch (e) {
        logger.error(e.message);
        res.status(200).send(createErrorResponse(statusCodes.ERROR, e.message));
    }
});

// update profile - Experience section
router.post('/experience', authenticate, async (req, res) => {
    try {
        const userId = req['user']['_id'];
        let profile = await Profile.getProfile(userId);
        if (!profile) {
            logger.debug("Profile not found for user "+ userId);
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
        logger.error(e.message);
        res.status(200).send(createErrorResponse(statusCodes.ERROR, e.message));
    }
});

// update profile - Social section
router.post('/social', authenticate, async (req, res) => {
    try {
        const userId = req['user']['_id'];
        const social = _.pick(req.body, ['github', 'website']);
        let profile = await Profile.getProfile(userId);
        if (!profile) {
            const profile = new Profile(social);
            await profile.save();
            res.send(createResponse(0, profile));
        }

        profile = await profile.updateSocial(social);
        res.send(createResponse(0, profile));
    } catch (e) {
        logger.error(e.message);
        res.status(200).send(createErrorResponse(statusCodes.ERROR, e.message));
    }
});

// update profile - About section
router.post('/about', authenticate, async (req, res) => {
    try {
        const userId = req['user']['_id'];
        const about = _.pick(req.body, ['about']);
        let profile = await Profile.getProfile(userId);
        if (!profile) {
            const profile = new Profile(about);
            await profile.save();
            res.send(createResponse(0, profile));
        }

        profile = await profile.updateAbout(req.body['about']);
        res.send(createResponse(0, profile));
    } catch (e) {
        logger.error(e.message);
        res.status(200).send(createErrorResponse(statusCodes.ERROR, e.message));
    }
});

module.exports = router;