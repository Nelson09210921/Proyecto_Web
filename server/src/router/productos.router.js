import { Router } from "express";
import { products, apiProducts, addProduct, getProduct, updateProduct, delProduct, getProductRela, upload, addCar, ultimoCar } from "../controllers/product.controller.js";

const routerProd = Router();


/* PRODUCTOS ****************** */
routerProd.get('/', products);
routerProd.get('/api/', apiProducts);   
routerProd.get('/:id', getProduct);
routerProd.get('/categ/:id', getProductRela);
routerProd.post('/', upload, addProduct);
routerProd.post('/addcar', addCar);
routerProd.get('/car/', ultimoCar);
routerProd.put('/:id', upload, updateProduct);
routerProd.delete('/:id', delProduct);

export default routerProd;