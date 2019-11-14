const logger = require('../../middleware/logger'),
    express = require('express'),
    router = express.Router(),
    _ = require('lodash'),
    {ObjectID} = require('mongodb'),
    {User} = require('../../models/User'),
    statusCodes = require('../../utils/statusCodes'),
    {createResponse, createErrorResponse} = require('../../utils/createServerResponse')

router.get('/api/v1/signin', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(createResponse(0, user));
    } catch (e) {
        res.status(400).send(createErrorResponse(statusCodes.LOGIN_FAILED, e));
    }
})

router.post('/signup', async (req, res) => {
    try {
        const body = _.pick(req.body, ['fullName','email', 'password','birthDate', 'createdDate', 'lastLogin', 'avatar']);
        const user = new User(body);
        await user.save();
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(createResponse(0, user));
    } catch (e) {
        res.status(400).send(createErrorResponse(statusCodes.SIGNUP_FAILED, e));
    }
});

module.exports = router;
