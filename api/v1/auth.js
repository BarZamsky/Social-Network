const express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    {User} = require('../../models/User'),
    statusCodes = require('../../utils/statusCodes'),
    {createResponse, createErrorResponse} = require('../../utils/createServerResponse'),
    {stringToDate} = require('../../utils/dateUtils')

router.post('/signin', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        let response = await User.findByCredentials(body.email, body.password);
        if (response.status_code !== 0) {
            res.send(createResponse(response.status_code, response.data));
            return;
        }
        let user = response.data;
        const token = await user.generateAuthToken();
        user = await user.updateLastLogin();
        user._doc['password'] = null;
        res.header('x-auth', token)
            .send(createResponse(0, user._doc));
    } catch (e) {
        res.status(400).send(createErrorResponse(statusCodes.LOGIN_FAILED, e));
    }
});

router.post('/register', async (req, res) => {
    try {
        const body = _.pick(req.body, ['fullName','email', 'password','birthDate', 'avatar']);
        body['createdDate'] =  new Date()
        body['birthDate'] =  stringToDate(body['birthDate'], "dd/MM/yyyy", "/");
        body['lastLogin'] = "";

        const user = new User(body);
        await user.save();
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(createResponse(0, user));
    } catch (e) {
        res.status(400).send(createErrorResponse(statusCodes.SIGNUP_FAILED, e.message));
    }
});

module.exports = router;
