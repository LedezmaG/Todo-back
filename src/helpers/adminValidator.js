const connection = require("../database/connection");
const util = require("util");
const query = util.promisify(connection.query).bind(connection)

const adminValidator = async (req, res, next) => {
    try {
        const { user } = req;
        const sql = `SELECT * FROM roles WHERE active = 1 AND id = ${user.role};`;
        const [resp] = await query( sql )
        if (!resp || resp.name != 'Admin') {
            throw new Error("Access forbidden");
        }

        next();
    } catch (error) {
        return res.status(401).json({ status: false, messaje: error.message });
    }
}

module.exports = {
    adminValidator,
};