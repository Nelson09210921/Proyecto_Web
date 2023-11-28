import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import indexRouter from './router/index.routers'
import routerProd from './router/productos.router'
import config from "./config";
//import productosRoutes from "./router/productos.router.js";

const app = express();

// Setting
app.set('port', config.config.port);

// Configurar el middleware para recibir y parsear JSON en las solicitudes
app.use(morgan("dev")); // Ven en clg el lista de peticiones
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// RUTAS *****
app.use(indexRouter);

export default app;