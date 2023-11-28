const { Router } = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
import routerProd from './productos.router';
/*
import routerCarrito from './carrito.routers';
import routerUser from './user.routers';
import routerComenta from './comentarios.routers'; */

const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));
router.use(session({secret:"secret"}));


/*
router.use('/product', routerProd);
router.use('/carrito', routerCarrito);
router.use('/user', routerUser);
router.use('/comentarios', routerComenta);
*/
router.use('/', routerProd);


router.use((req, res, next) => {
    res.status(404).render('404.ejs');
});

router.use(session({
    secret: 'mi_secreto',
    resave: false,
    saveUninitialized: true
}));


module.exports = router;