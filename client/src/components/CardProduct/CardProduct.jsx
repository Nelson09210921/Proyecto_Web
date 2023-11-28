import React, { useContext, useEffect, useState } from 'react';
import { Link} from 'react-router-dom'
import './CardProduct.Style.css'
import { Estrellas } from '../Estrellas/Estrellas';
import { urlApi } from '../../Js/functions';
import { BtnAgregarCar } from '../BtnAgregarCar/BtnAgregarCar';
import { counterContext } from '../../context/counterContex';

export const CardProduct = ({data, agregarAlCarrito}) => {

    const { estadoCar } = useContext(counterContext);
    const [loading, setLoading] = useState(true);
    

    useEffect(() => {
        // Simula un tiempo de carga de 2 segundos
        setTimeout(() => {
        setLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        estadoCar([{
            car: data,
        }]);
    }, [data]);


    const Dcto = ({ dctoAct, precio }) => {
        return (
            dctoAct > 0 ?
                <>
                <p className="noVenta"><strike>$ {precio} </strike></p>
                <p className="venta"> $ {(precio * dctoAct) / 100} </p>
                </>
                : 
                <p className="venta">$ {precio}</p>
        );
    };


    return (
      <>
      {loading ? (
        <div className="loader"> </div> // Muestra la animación mientras se carga
      ) : (
        
      
      <div className='contGrid'>
      {(typeof data === 'undefined') ? (
          <h1> Loanding... </h1>
        ) : (
            data.map((prod, index) => (
                <div key={index} className='card-produc'>
                    <figure>
                        {
                            !prod.prod_img
                            ? <img src={`/img/icon/img-defect4x4.svg`} alt={prod.prod_nom} />
                            : <img src={`${urlApi}uploads/${prod.prod_img}`} alt={prod.prod_nom} />
                        }
                        
                    </figure>

                    <div className="rangStar">
                        <Estrellas data={prod.prod_calif} />
                    </div>

                    <div className="contInfo">
                        <h3 className='prodNom'> {prod.prod_nom} </h3>
                        <div>

                        <div>
                            <div className="contPrecio">
                                <Dcto dctoAct={prod.prod_precio_dcto} precio={prod.prod_precio} />
                            </div>
                        </div>    

                        <div className="contBtnCard">
                            <Link to={`/detalles/${prod.prod_id}`} className="btn btn4x1">
                                    Saber más
                            </Link>
                            
                            <BtnAgregarCar data={prod} agregarAlCarrito={agregarAlCarrito} />
                        </div>
                        </div>
                    </div>

                </div>
          ))
          )}
      </div>

      )}
      </>
    )
}