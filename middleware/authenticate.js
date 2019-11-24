const {User} = require('../models/User');
const logger = require('./logger');
const statusCode = require('../utils/statusCodes');
const {createResponse, createErrorResponse} = require('../utils/createServerResponse');

module.exports = async (req, res, next) => {
    const token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token)
        return res.status(401)
            .json(createErrorResponse(statusCode.UNAUTHORIZED,'Unauthorized, access denied'));

    const response = await User.findByToken(token);
    if(response.status_code === statusCode.INVALID_TOKEN) {
        logger.debug('Invalid token, '+ response.message);
        res.status(401)
            .json(createErrorResponse(statusCode.INVALID_TOKEN, response.message));
    } else if (response.status_code === statusCode.USER_NOT_FOUND){
        logger.debug('user not found');
        return res.status(404)
            .json(createErrorResponse(statusCode.USER_NOT_FOUND, 'user not found'));
    }

    logger.debug('Authorized user, '+response.data["_id"]);
    req.user = response.data;
    req.token = token;
    next();
};

