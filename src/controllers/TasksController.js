const connection = require("../database/connection");
const util = require("util");
const query = util.promisify(connection.query).bind(connection)

const GetAll = async (req, res = response) => {
    try {
        const { user } = req;
        const { limit = 20, offset = 0 } = req.query;
        const sql = `SELECT id, title, description, status, deadline FROM tasks WHERE active = 1 AND id_user = ${user.id} LIMIT ${limit} OFFSET ${offset};`;
        const resp = await query( sql )
        const [respCount] = await query( `SELECT count(*) AS count FROM tasks WHERE active = 1 AND id_user = ${user.id};` )
        if (!resp || !respCount) {
            return res.status(204).json({ status: false, messaje: 'Data not found' });
        }
        return res.status(200).json({
            status: true,
            results: resp,
            meta: {
                count: respCount.count,
                limit: parseInt(limit), 
                offset: parseInt(offset)
            }
        });
    } catch (error) {
        console.log("🚀 ~ file: TasksController.js:25 ~ GetAll ~ error:", error)
        return res.status(400).json({ status: false, messaje: error.message });
    }
};

const GetById = async (req, res = response) => {
    try {
        const { user } = req;
        const { id } = req.params;
        const sql = `SELECT * FROM tasks WHERE id = ${id} AND active = 1 AND id_user = ${user.id};`;
        const [resp] = await query( sql )
        if (!resp) {
            return res.status(204).json({ status: false, messaje: 'Data not found' });
        }
        return res.status(200).json({
            status: true,
            results: resp,
        });
    } catch (error) {
        console.log("🚀 ~ file: TasksController.js:43 ~ GetById ~ error:", error)
        return res.status(400).json({ status: false, messaje: error.message });
    }
};

const Create = async (req, res = response) => {
    try {
        const { user } = req;
        const { title, description, status, deadline, comment, responsible, tags } = req.body;
        const sql = `INSERT INTO tasks (id_user, title, description, status, deadline, comment, responsible, tags) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        const resp = await query( 
            sql, 
            [
                user.id, 
                title, 
                description, 
                status, 
                deadline, 
                comment, 
                responsible, 
                tags
            ] 
        )
        return res.status(200).json({
            status: true,
            results: {
                id: resp.insertId
            }
        });
    } catch (error) {
        console.log("🚀 ~ file: TasksController.js:72 ~ Create ~ error:", error)
        return res.status(400).json({ status: false, messaje: error.message });
    }
};

const Update = async (req, res = response) => {
    try {
        const { user } = req;
        const { id, title, description, status, deadline, comment, responsible, tags } = req.body;
        const timestamp = new Date().toISOString();
        const sql = `UPDATE tasks SET ?, ?, ?, ?, ?, ?, ?, ? WHERE id = ${id} AND active = 1 AND id_user = ${user.id};`;
        await query( 
            sql,
            [
                {title},
                {description},
                {status},
                {deadline},
                {comment},
                {responsible},
                {tags},
                {updated: timestamp}
            ]
        )
        
        return res.status(200).json({ status: true });
    } catch (error) {
        console.log("🚀 ~ file: TasksController.js:99 ~ Update ~ error:", error)
        return res.status(400).json({ status: false, messaje: error.message });
    }
};

const Delete = async (req, res = response) => {
    try {
        const { user } = req;
        const { id } = req.params;
        const timestamp = new Date().toISOString();
        const sql = `UPDATE tasks SET ?, ? WHERE id = ${id} AND active = 1 AND id_user = ${user.id};`;
        await query( 
            sql,
            [
                {active: 0},
                {updated: timestamp}
            ]
        )
        return res.status(200).json({ status: true });
    } catch (error) {
        console.log("🚀 ~ file: TasksController.js:119 ~ Delete ~ error:", error)
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
