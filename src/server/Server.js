const express = require("express");
const connection = require("../database/connection");
// ROUTES


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 4051;
        this.middleware();
        this.routes();
        this.dbConect();
    }

    async dbConect() {
        try {
            connection.connect()
    
            connection.query('SELECT 1 + 1 AS solution', (err) => {
                if (err) throw err
                console.log("Database online")
            })
            connection.end()
        } catch (error) {
            console.log(error)
        }
    }

    middleware() {
        
    }

    routes() {
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server online, PORT running: " + this.port);
        });
    }
}
module.exports = Server;
