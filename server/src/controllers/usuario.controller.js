import multer from 'multer';
const fs = require('fs');
import { getConn } from './../Data/config';


// Configuración de Multer para el almacenamiento de imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/uploads/user'); // Carpeta donde se guardarán las imágenes
      const fotoNew = cb;
      return fotoNew
  },
  filename: (req, file, cb) => {
      // Nombre de archivo único
      cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });
exports.upload = upload.single('u_foto');






// Todos desde la Api
export const apiUser = async(req, res) => {

  try {
    const conn = await getConn();
    const result = await conn.query("SELECT * FROM usuario");
    res.json(result);
    
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

}

/// Agregar
export const addUser = async(req, res) => {

  try {
    
    const {
      u_ced,
      u_nom,
      u_usu,
      u_pass,
      u_telf,
      u_ema,
      u_nac,
      u_dir,
      u_nivel,
      u_status
    } = req.body; 

    const conn = await getConn();
    
    const sql = 'SELECT COUNT(*) AS count FROM usuario WHERE u_ema = ? OR u_telf = ?';
    conn.query(sql, [u_ema, u_telf], (err, result) => {

      if (err) {
        console.error('Error al consultar la base de datos:', err);
        res.status(500).json({ error: 'Error al verificar el correo' });

      } else {
        const count = result[0].count;
        const existe = count > 0;
        
        if(existe ===  true){
          res.status(200).json({ existe });

        } else {

          if(req.file){
            var foto = comprobarImagen(req.file.path);
          }
          
          const usuario = {
            u_ced,
            u_nom,
            u_usu,
            u_pass,
            u_telf,
            u_ema,
            u_nac,
            u_dir,
            u_nivel,
            u_status,
            u_foto : foto
          }
        
          conn.query("INSERT INTO usuario SET ?", usuario);
          //const data = conn.query("SELECT * FROM usuario");          
          res.json({ existe });
        }
      }
    });

  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
}

/// Comprobar Foto
const comprobarImagen = (img) => {
  const cadena = img;
  var newCadena = cadena.replace(/\\/g, "/");
  let primerIndice = newCadena.indexOf("/");
  let segundoIndice = newCadena.indexOf("/", primerIndice + 1);
  const foto = newCadena.slice(segundoIndice + 1);
  return foto;
}

/// Buscar
export const getUser = async(req, res) => {

  try {
    
    const { id } = req.params;
    
    const conn = await getConn();
    const result = await conn.query('SELECT * FROM usuario WHERE u_id = ?', id);
    res.json(result);

  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

}
/// Eliminar
export const delUser = async(req, res) => {

  try {
    
    const { id } = req.params;
    
    const conn = await getConn();
    const result = await conn.query('DELETE FROM usuario WHERE u_id = ?', id);
    res.json({ message: "Eliminado con Éxito" });

  } catch (error) {
    res.status(500);
    res.send(error.message);
  }

}
/// Actualizar
export const updateUser = async(req, res) => {

    try {
      
      const { id } = req.params;
      const {
        u_ced,
        u_nom,
        u_usu,
        u_pass,
        u_telf,
        u_ema,
        u_nac,
        u_dir,
        u_nivel,
        u_status
      } = req.body;
    
      const usuarios = {
        u_ced,
        u_nom,
        u_usu,
        u_pass,
        u_telf,
        u_ema,
        u_nac,
        u_dir,
        u_nivel,
        u_status,
      }
  
      const conn = await getConn();
      const result = await conn.query("UPDATE usuario SET ? WHERE u_id = ?", [usuarios, id], (error, results) => {
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