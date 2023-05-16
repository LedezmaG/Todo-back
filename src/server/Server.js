const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("../database/connection");
// ROUTES
const authRoute = require("../routes/authRoute");
const usersRoute = require("../routes/usersRoute");
const rolesRoute = require("../routes/rolesRoute");
const taskRoute = require("../routes/taskRoute");

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8081;
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
        } catch (error) {
            console.log(error)
        }
    }

    middleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    routes() {
        this.app.use("/auth", authRoute);
        this.app.use("/roles", rolesRoute);
        this.app.use("/users", usersRoute);
        this.app.use("/tasks", taskRoute);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server online, PORT running: " + this.port);
        });
    }
}
module.exports = Server;
