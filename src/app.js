import express from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
require('dotenv').config();


class App{

  constructor(){
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares(){
    this.server.use(cors())
      // Opção 2: Habilitar CORS com configurações específicas (RECOMENDADO para produção)
  /*
  const corsOptions = {
    origin: 'http://localhost:3000', // Substitua pela URL da sua aplicação frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Se você precisa enviar cookies ou cabeçalhos de autorização
    optionsSuccessStatus: 204 // Algumas configurações de navegador preferem 204 para pré-voo
  };
  this.server.use(cors(corsOptions));
  */

  // Opção 3: Habilitar CORS para múltiplas origens (RECOMENDADO para produção com múltiplos frontends)
  /*
  const allowedOrigins = ['http://localhost:3000', 'https://seusite.com'];
  this.server.use(cors({
    origin: function (origin, callback) {
      // Permite requisições sem "origin" (e.g. mobile apps, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
  }));
    */
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    )

    this.server.use(express.json());
  }

  routes(){
    this.server.use(routes);
  }

}

export default new App().server;