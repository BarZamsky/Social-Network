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
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        user._doc['password'] = null
        user._doc['tokens'] = []
        res.header('x-auth', token)
            .send(createResponse(0, user._doc));
    } catch (e) {
        res.status(400).send(createErrorResponse(statusCodes.LOGIN_FAILED, e));
    }
})

router.post('/signup', async (req, res) => {
    try {
        const body = _.pick(req.body, ['fullName','email', 'password','birthDate', 'createdDate', 'lastLogin', 'avatar']);
        body['createdDate'] =  new Date()
        body['birthDate'] =  stringToDate(body['birthDate'], "dd/MM/yyyy", "/")
        if (!body['lastLogin'])
            body['lastLogin'] = ""

        const user = new User(body);
        await user.save();
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(createResponse(0, user));
    } catch (e) {
        res.status(400).send(createErrorResponse(statusCodes.SIGNUP_FAILED, e));
    }
});

module.exports = router;
