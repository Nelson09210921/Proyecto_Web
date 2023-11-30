import multer from 'multer';
import { getConn } from './../Data/config';
import mercadopago from 'mercadopago';
import config from '../config';

mercadopago.configure({
    access_token : `${config.config.token}`,
});

/*
Mastercard
5120 6944 7061 6271
123
11/25
*/

/// Actualizar
export const payCar = async(req, res) => {
  // Crea un objeto de preferencia

  const { description, price, quantity } = req.body;

  let preference = {
    items: [
      {
        title: description,
        unit_price: Number(price),
        quantity: Number(quantity),
      },
    ],
    back_urls:{
        success: `http://localhost:5173/`,
        failure: `http://localhost:5173/`,
        pending: "",
    },
    auto_retur: "approved",
  };
  
  mercadopago.preferences
  .create(preference)
  .then(function (response) {
    res.json({
        id: response.body.id,
    })
  })
  .catch(function (error) {
    console.log(error);
  });
};