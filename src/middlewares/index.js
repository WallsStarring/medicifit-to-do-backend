const validation = require('./validation');
exports.MDWR = {
    ...require('./authorisation'),
    ...require('./upload.files'),
    validationMiddleware: validation,
};
