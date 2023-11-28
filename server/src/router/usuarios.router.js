import { Router } from "express";
import { apiUser, getUser, addUser, updateUser, delUser, upload } from "../controllers/usuario.controller";

const routerUser = Router();


/* PRODUCTOS ****************** */
routerUser.get('/api', apiUser);   
routerUser.get('/:id', getUser);
routerUser.post('/', upload, addUser);
routerUser.put('/:id', updateUser);
routerUser.delete('/:id', delUser);

export default routerUser;