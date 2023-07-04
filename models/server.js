const express = require('express');
const mongoose = require("mongoose");
var cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.tasksPath = '/api/tasks';

        // Conectar a DB
        this.conectarDB();
        
        // Middlewares
        this.middlewares();

        // Rutas de mi app
        this.routes();
    }

    async conectarDB() {

        try {
        
            await mongoose.connect( process.env.MONGODB_CNN, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
    
            console.log("Database online");
    
        } catch (error) {
            console.log(error);
            throw new Error('Error while attempting conection with the database');
        }

    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Reads and parse the body
        this.app.use( express.json() );

    }

    routes() {
        
        this.app.use( this.tasksPath, require("../routes/tasks") );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Server running on port ${ this.port }`);
        });
    }

}

module.exports = Server;