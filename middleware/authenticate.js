const {User} = require('../models/User');
const logger = require('./logger')
const statusCode = require('../utils/statusCodes')

export const authenticate = async (req, res, next) => {
    const token = req.header('x-auth');
    if (!token)
        return res.status(401).json({
            status_code: statusCode.UNAUTHORIZED,
            error: 'Unauthorized, access denied'
        })

    const user = await User.findByToken(token, (err, user) => {
        if (err) {
            if(err.statusCode === statusCode.INVALID_TOKEN) {
                logger.debug('Invalid token, %s', token)
                res.status(401).json({
                    status_code: statusCode.INVALID_TOKEN,
                    error: err.msg
                })
            }
            else {
                logger.error('server error, %s', err)
                return res.status(500).json({
                    status_code: statusCode.SERVER_ERROR,
                    error: err
                })
            }
        }

        if (!user) {
            logger.error('No user found for token %s', token)
            return res.status(401).json({
                status_code: statusCode.USER_NOT_FOUND,
                error: 'No user found for given token'
            })
        }

        logger.debug('Found user for token %s', token)
        req.user = user;
        req.token = token;
        next();
    })
};
