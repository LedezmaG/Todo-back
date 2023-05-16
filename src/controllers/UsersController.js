const connection = require("../database/connection");
const util = require("util");
const query = util.promisify(connection.query).bind(connection)

const GetAll = async (req, res = response) => {
    try {
        const sql = 'SELECT * FROM users WHERE active = 1';
        const resp = await query( sql )
        if (!resp) {
            return res.status(204).json({ status: false, messaje: 'Data not found' });
        }
        return res.status(200).json({
            status: true,
            response: resp
        });
    } catch (error) {
        return res.status(400).json({ status: false, messaje: error.message });
    }
};

const GetById = async (req, res = response) => {
    try {
        const { id } = req.params;
        const sql = `SELECT * FROM users WHERE id = ${id} AND active = 1`;
        const resp = await query( sql )
        if (!resp) {
            return res.status(204).json({ status: false, messaje: 'Data not found' });
        }
        return res.status(200).json({
            status: true,
            response: resp,
        });
    } catch (error) {
        return res.status(400).json({ status: false, messaje: error.message });
    }
};

const Create = async (req, res = response) => {
    try {
        const { id_role, name, username } = req.body;
        const sql = `INSERT INTO users (id_role, name, username) VALUES (?, ?, ?);`;
        const resp = await query( 
            sql,
            [
                id_role, 
                name, 
                username
            ]    
        )
        return res.status(201).json({
            status: true,
            response: resp,
        });
    } catch (error) {
        return res.status(400).json({ status: false, messaje: error.message });
    }
};

const Update = async (req, res = response) => {
    try {
        const { id, id_role, name, username } = req.body;
        const timestamp = new Date().toISOString();
        const sql = `UPDATE users SET ?, ?, ?, ? WHERE id = ${id} AND active = 1;`;
        await query( 
            sql, 
            [
                {id_role},
                {name},
                {username},
                {updated: timestamp}
            ]    
        )
        return res.status(200).json({ status: true });
    } catch (error) {
        return res.status(400).json({ status: false, messaje: error.message });
    }
};

const Delete = async (req, res = response) => {
    try {
        const { id } = req.params;
        const timestamp = new Date().toISOString();
        const sql = `UPDATE users SET ?, ? WHERE id = ${id} AND active = 1;`;
        await query( 
            sql,
            [
                {active: 0},
                {updated: timestamp}
            ]
        )
        return res.status(200).json({ status: true });
    } catch (error) {
        return res.status(400).json({ status: false, messaje: error.message });
    }
};

module.exports = {
    GetAll,
    GetById,
    Create,
    Update,
    Delete,
};
