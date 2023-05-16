const jwt = require("jsonwebtoken");
const connection = require("../database/connection");
const util = require("util");
const query = util.promisify(connection.query).bind(connection)

const GenerateToken = async (req, res = response) => {
    try {
        const { username } = req.body;
        const sql = `SELECT * FROM users WHERE active = 1 AND username = '${username}'`;
        const [resp] = await query( sql )
        if (!resp) {
            return res.status(204).json({ status: false, messaje: 'Data not found' });
        }
        const token = jwt.sign(
            {
                id: resp.id,
                name: resp.name,
                username: resp.username,
            },
            `${process.env.SECRET_KEY}`,
            { expiresIn: "1d" }
        );
        return res.status(200).json({
            status: true,
            response: {token}
        });
    } catch (error) {
        return res.status(400).json({ status: false, messaje: error.message });
    }
};


module.exports = {
    GenerateToken
};
