import multer from 'multer';
const fs = require('fs');
import { getConn } from './../Data/config';


// Configuración de Multer para el almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/uploads/productos'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
      // Nombre de archivo único
      cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
exports.upload = upload.single('prod_img');

export const products = async(req, res) => {

  try {
    const conn = await getConn();
    const result = await conn.query("SELECT * FROM producto");
    //var pagina = req.params.pagina;
    res.render('productos', { productos: result });
    
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

}

// Todos desde la Api
export const apiProducts = async(req, res) => {

  try {
    const conn = await getConn();
    const result = await conn.query("SELECT * FROM producto");
    res.json(result);
    
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

}

/// Agregar
export const addProduct = async(req, res) => {

  try {
    
    const { 
      prod_nom,
      prod_desc,
      prod_precio,
      prod_precio_dcto,
      prod_marca,
      prod_model,
      prod_cate,
      prod_stock,
      prod_calif
    } = req.body;


    /* const u_foto = `${Date.now()}-${req.file.originalname}`; */
     
     const cadena = req.file.path;
     var newCadena = cadena.replace(/\\/g, "/");
     let primerIndice = newCadena.indexOf("/");
     let segundoIndice = newCadena.indexOf("/", primerIndice + 1);
     let prod_img = newCadena.slice(segundoIndice + 1);
    

    if(prod_nom === '' || prod_precio === '' || prod_stock === '' ){
      res.status(400).json({message: "Por favor rellene todos los campos."});
    }

    const productos = {
      prod_nom,
      prod_desc,
      prod_precio,
      prod_precio_dcto,
      prod_marca,
      prod_model,
      prod_cate,
      prod_stock,
      prod_calif,
      prod_img
    }

    const conn = await getConn();
    const result = await conn.query("INSERT INTO producto SET ?", productos);

    res.json({ message: "Producto creado", result });

  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}
/// Buscar
export const getProduct = async(req, res) => {

  try {
    
    const { id } = req.params;
    
    const conn = await getConn();
    const result = await conn.query('SELECT * FROM producto WHERE prod_id = ?', id);
    res.json(result);

  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

}
/// Buscar productos relacionados + Limit 3
export const getProductRela = async(req, res) => {

  try {
    
    const { 
      prod_marca,
      prod_cate
    } = req.body;

    const recomendados = {
      prod_marca,
      prod_cate
    }
    
    const conn = await getConn();
    const result = await conn.query('SELECT * FROM `producto` LIMIT 3;', recomendados);
    //const result = await conn.query('SELECT * FROM `producto` WHERE `prod_marca` = ? OR `prod_cate` = ? LIMIT 3;', recomendados);
    res.json(result);

  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

}
/// Eliminar
export const delProduct = async(req, res) => {

  try {
    
    const { id } = req.params;
    
    const conn = await getConn();
    const result = await conn.query('DELETE FROM producto WHERE prod_id = ?', id);
    res.json({ message: "Eliminado con Éxito" });

  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

}
/// Actualizar
export const updateProduct = async(req, res) => {

  try {
    
    const { id } = req.params;
    const { 
      prod_nom,
      prod_desc,
      prod_precio,
      prod_precio_dcto,
      prod_marca,
      prod_model,
      prod_cate,
      prod_stock,
      prod_calif,
      } = req.body;


    if(id === undefined || prod_nom === undefined || prod_precio === undefined || prod_stock === undefined ){
      res.status(400).json({message: "Por favor rellene todos los campos."});
    }

    const productos = {
      prod_nom,
      prod_desc,
      prod_precio,
      prod_precio_dcto,
      prod_marca,
      prod_model,
      prod_cate,
      prod_stock,
      prod_calif
    }

    const conn = await getConn();
    const result = await conn.query("UPDATE producto SET ? WHERE prod_id = ?", [productos, id], (error, results) => {
      if (error) {
        console.error('Error al actualizar los datos en MySQL:', error);
        res.status(500).send(`Error al actualizar los datos ${id}`);
      } else {
        console.log('Datos actualizados en MySQL');
        res.send('Datos actualizados');
      }
    })
    //res.json({ message: "Producto actualizado" });

  } catch (error) {
    res.status(500);
    //res.send(error.message + ' >>>>> ' + req.body.prod_nom);
    res.send(' >>>>> ' + req.body.prod_nom);
  }

}


/// Crear Carrito
export const addCar = async(req, res) => {

  try {
    
    const { u_id } = req.body;
    const carrito = { u_id }

    const conn = await getConn();
    const creado = await conn.query("INSERT INTO carrito SET ?", carrito);

    res.json({ creado,  });

  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

}
/// Ultimo Carrito
export const ultimoCar = async(req, res) => {

  try {
    const conn = await getConn();
    var data = await conn.query('SELECT * FROM carrito ORDER BY car_id DESC LIMIT 1');
    res.json(data);

  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

}