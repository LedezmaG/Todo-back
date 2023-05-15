const { validationResult } = require("express-validator");

const fileValidator = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status: false,
            errors,
        });
    }

    next();
};

module.exports = {
    fileValidator,
};
