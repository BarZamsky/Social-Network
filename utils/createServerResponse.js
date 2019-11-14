const createResponse = (statusCode, data) => {
    return {
        status_code: statusCode,
        data: data
    }
}

const createErrorResponse = (statusCode, err) => {
    return {
        status_code: statusCode,
        error: err
    }
}

module.exports = { createResponse, createErrorResponse }