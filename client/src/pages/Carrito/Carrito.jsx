import React, { useContext, useEffect, useState } from 'react'
import { ProductsApi, showAlert, urlApi } from '../../Js/functions';
import './Carrito.Style.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { counterContext } from '../../context/counterContex';


export const  Carrito = ({
  productos,
  sumarCantCarrito,
  bajarCantCarrito,
  delItemCarrito,
  vaciarCarrito
}) => {

  const urlModul = 'car/';

  const { state } = useContext(counterContext);
  const [preferenceId, setPreferenceId ] = useState(null);
  initMercadoPago('TEST-6708d1ef-5ab0-49c6-aeec-bd8953ed190e');

  useEffect(() => {
    calcularTotal()
  }, [productos]);

  function calcularTotal() {   
      let total = 0;

      if(productos.length > 0){
        for (const prod of productos) {
            total += prod.precio;
        }
        return total;
      }
      //setCartItems(total); // Cambia esto por la lógica de cálculo real.
  }


  const crearPreferencias = async () => {
    
    try {
      const response = await ProductsApi.post(`${urlModul}`, {
        description: state[0]?.username,
        price: calcularTotal(),
        quantity: 1,
        currency_id: "COP"
      });
      
      /*
      showAlert('Agregado con Exito', 'success');
      console.log(`%cCreado!`,
      `color: yellow;
      font-family:system-ui;
      font-size:1.2rem;
      -webkit-text-stroke: 1px black;
      font-weight:bold`);
      console.log(response.data);
      */

      const { id } = response.data;
      return id;
      
      //window.location.href = response.data.init_point;
    } catch (error) {
      showAlert(error, 'error');
    }
  };

  const pasarelaPago = async () => {
    const id = await crearPreferencias();
    if(id){
      setPreferenceId(id);
    }
  }
  

  return (
    <>
      <div className='container'>   

        <div className="row">
          <div className='col-12 pb-4'>
            <div className='row'>
                <div className="col-md-4 cartButtons">
                    <button className='btn primary-lin'
                    onClick={vaciarCarrito}
                    > LIMPIAR </button>
                    <button className='btn primary'
                    onClick={pasarelaPago} > PAGAR   </button>
                </div>
                <div className='col-md-8 text-end contDeg'>
                    <p>Total: $ { productos.length !== 0 ? calcularTotal() : 0 } </p>
                </div>
                <div className='col-md-12'>
                    {preferenceId && <Wallet initialization={{ preferenceId }} />}
                </div>
            </div>
          </div>         
        </div>

        <div className='col-12 contInfoCar'>
          <div className='row'>

            {console.log(productos)}
            {productos.length === 0 ? (
              <div className="msjInfo">
                <img className='imgInfo' src='./img/icon/sinProductos.svg' />
                <p>No hay productos en el carrito.</p>
                <Link to='/productos' className='btn primary-lin'>
                    Agrega algo al carrito 
                </Link>
              </div>

            ) : (
              productos.map(producto => (
                <div className="contItemCar" key={producto.prod_id}>
                  <figure>
                      <img src={`${urlApi}uploads/${producto.prod_img}`} />
                  </figure>

                  <div className='col-md-6'>
                      <h3> {producto.prod_nom} </h3>
                      <div>
                          <p>
                            $ {producto.prod_precio}
                            <span> $ {producto.prod_precio_dcto} </span>
                          </p>
                          <p>
                          {producto.prod_desc}
                          </p>
                      </div>
                  </div>
      
                  <div className='col-md-2 carPrecio'>
                      <h2 className='text-center'> $ {producto.precio} </h2>
                  </div>
      
                  <div className='contBtnCar'>
                      <div className='contBtnCarCant'>
                          <button className='btnA btn-4x4'
                            onClick={() => sumarCantCarrito(producto)}
                          >
                            <i className="fa-solid fa-plus"></i>
                          </button>
                          <input type="text" className='text-center' value={producto.cantidad} />
                          <button className='btnA btn-4x4'
                            disabled={producto.cantidad === 0 ? true : ''}
                            onClick={() => bajarCantCarrito(producto)}
                          >
                          <i className="fas fa-minus"></i>
                          </button>
                      </div>
                      <button className='btn btnPrimary'
                        onClick={() => delItemCarrito(producto.prod_id)}
                      >
                          <img src="img/icon/delete.svg" alt="" />
                      </button>
                  </div>

                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </>
  )
}
