import { Router } from "express";
import { payCar } from "../controllers/car.controller.js";

const routerCar = Router();


/* PRODUCTOS ****************** */
routerCar.post('/', payCar);
/* routerCar.get('/api/', apiProducts);   
routerCar.get('/:id', getProduct);
routerCar.get('/categ/:id', getProductRela);
routerCar.post('/', upload, addProduct);
routerCar.post('/addcar', addCar);
routerCar.get('/car/', ultimoCar);
routerCar.put('/:id', upload, updateProduct);
routerCar.delete('/:id', delProduct); */

export default routerCar;