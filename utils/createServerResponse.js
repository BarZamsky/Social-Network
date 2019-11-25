const createResponse = (statusCode, data) => {
    return {
        status_code: statusCode,
        data: data
    }
};

const createErrorResponse = (statusCode, errMessage) => {
    return {
        status_code: statusCode,
        error: errMessage
    }
};

module.exports = { createResponse, createErrorResponse };