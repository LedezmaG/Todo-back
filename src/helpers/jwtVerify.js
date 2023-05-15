const jwt = require("jsonwebtoken");
const moment = require("moment");

const JwtVerify = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (token == null) {
            throw new Error("Token is required");
        }

        const payload = jwt.decode(token, process.env.SECRET_KEY);

        if (payload.exp <= moment().unix()) {
            throw new Error("token expired");
        }

        req.auth_user = payload;
        req.token = token;
        next();
    } catch (error) {
        return res.status(401).json({ status: false, messaje: error.message });
    }
};

module.exports = {
    JwtVerify,
};
