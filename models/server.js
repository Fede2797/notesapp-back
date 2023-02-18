const express = require('express');
const mongoose = require("mongoose");
var cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT
        this.usuariosPath = '/api/notes';

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
                // useCreateIndex: true,
                // useFindAndModify: false
            });
    
            console.log("Base de datos online");
    
        } catch (error) {
            console.log(error);
            throw new Error('Error en la conexión la base de datos');
        }

    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

    }

    routes() {
        
        this.app.use( this.usuariosPath, require("../routes/notes") );
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(`Servidor corriendo en puerto ${ this.port }`);
        });
    }

}

module.exports = Server;