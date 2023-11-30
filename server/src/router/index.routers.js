import { Router } from "express";
import routerProd from "./productos.router";
import routerUser from "./usuarios.router";
import routerCar from "./car.router";
//import path from 'path';


const indexRouter = Router();


indexRouter.use('/product', routerProd);
indexRouter.use('/user', routerUser);
indexRouter.use('/car', routerCar);


export default indexRouter;