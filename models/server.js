const express = require('express')
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        this.paths = {
            auth: '/api/auth',
            buscar:'/api/buscar', 
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios'
        }

        //Conectar a la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();
        
        //Rutas de mi app
        this.routes();
    }

    async conectarDB() {
        await dbConection()
    }

    middlewares() {
        //CORS
        this.app.use(cors())

        //Lectura y parseo del body
        this.app.use( express.json())

        //Directorio publico
        this.app.use( express.static('public'))
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.usuarios, require('../routes/user'))
        this.app.use(this.paths.productos, require('../routes/productos'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor Corriendo en el puerto', this.port);
        });
    }

}

module.exports = Server;