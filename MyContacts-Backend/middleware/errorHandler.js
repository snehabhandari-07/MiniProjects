const {constants} = require("../constants");
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    switch (statusCode) {
        case constants.VALIDATION_FAILED:
            res.status(statusCode).json({
                title: "Validation Failed",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.status(statusCode).json({
                title: "Not found",
                message: err.message,
                stackTrace: err.stack
            });
        case constants.FORBIDDEN:
            res.status(statusCode).json({
                title: "Forbidden Access",
                message: err.message,
                stackTrace: err.stack
            });
        case constants.UNAUTHORIZED:
            res.status(statusCode).json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack
            });
        case constants.SERVER_ERROR:
            res.status(statusCode).json({
                title: "Server Error",
                message: err.message,
                stackTrace: err.stack
            });
        default:
            break;
    }

};
module.exports = errorHandler;