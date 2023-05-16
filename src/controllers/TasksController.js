const connection = require("../database/connection");
const util = require("util");
const query = util.promisify(connection.query).bind(connection)

const GetAll = async (req, res = response) => {
    try {
        const sql = 'SELECT id, title, description, status, deadline FROM tasks WHERE active = 1';
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
        const sql = `SELECT * FROM tasks WHERE id = ${id} AND active = 1`;
        // const sql = `SELECT title, description, status, deadline, comment, responsible, tags, created FROM tasks WHERE id = ${id} AND active = 1`;
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
        const { id_user, title, description, status, deadline, comment, responsible, tags } = req.body;
        const sql = `INSERT INTO tasks (id_user, title, description, status, deadline, comment, responsible, tags) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const resp = await query( 
            sql, 
            [
                id_user, 
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
            response: {insertId: resp.insertId},
        });
    } catch (error) {
        return res.status(400).json({ status: false, messaje: error.message });
    }
};

const Update = async (req, res = response) => {
    try {
        const { id, id_user, title, description, status, deadline, comment, responsible, tags } = req.body;
        const timestamp = new Date().toISOString();
        const sql = `UPDATE tasks SET ?, ?, ?, ?, ?, ?, ?, ?, ? WHERE id = ${id} AND active = 1;`;
        const r=  await query( 
            sql,
            [
                {id_user},
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
        console.log("🚀 ~ file: TasksController.js:87 ~ Update ~", [
            {id_user},
            {title},
            {description},
            {status},
            {deadline},
            {comment},
            {responsible},
            {tags}
        ])
        return res.status(200).json({ status: true, r });
    } catch (error) {
        return res.status(400).json({ status: false, messaje: error.message });
    }
};

const Delete = async (req, res = response) => {
    try {
        const { id } = req.params;
        const timestamp = new Date().toISOString();
        const sql = `UPDATE tasks SET ?, ? WHERE id = ${id} AND active = 1;`;
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
