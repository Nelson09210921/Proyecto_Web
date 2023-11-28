import React, { useEffect, useState } from 'react';

import '../style/detalles.css'

import { ProductsApi, urlApi } from '../Js/functions';
import { CardProduct } from '../components/CardProduct/CardProduct';
import { Estrellas } from '../components/Estrellas/Estrellas';
import { BtnAgregarCar } from '../components/BtnAgregarCar/BtnAgregarCar';
/*
import axios from 'axios';
import { BarMenu } from '../components/BarMenu/barMenu';
import { CardProduct } from '../components/CardProduct/CardProduct';
*/


export const Detalles = ({urlAct, agregarAlCarrito}) => {

const baseURL = ProductsApi.defaults.baseURL;
  const urlModul = 'product/';
  const urlComentariosApi = 'comentarios/';

  const [urlTE, setUrlTe] = useState([{}])
  const [dataProduc, setDataProduc] = useState([{}])
  const [dataComent, setDataComent] = useState([{}])
  const [backendData, setBackendData] = useState([{}])

  const [imagenGrande, setImagenGrande] = useState('');

  const url = window.location.href;
	const urlArray = url.split('/');
	const lastElement = urlArray.pop();

  useEffect(() => {
    setUrlTe(urlAct);
  }, [urlAct]);
  
  useEffect(() => {
    fetchData();
    comentarios();
    relacionados();
  }, [urlTE]);
  
  useEffect(() => {
    primeraImagen();
  }, [dataProduc]);
  
  
  async function fetchData() {
    try {
      const response = await ProductsApi.get(`${urlModul}${lastElement}`);
      console.log(response.data);
      setDataProduc(response.data);

    } catch (error) {
      console.error(error);
    }
  }

  async function comentarios() {
    try {
      const response = await ProductsApi.get(`${urlComentariosApi}${lastElement}`);
      console.log(response.data);
      setDataComent(response.data);

    } catch (error) {
      console.error(error);
    }
  }

  async function relacionados() {
    try {
      const response = await ProductsApi.get(`${urlModul}categ/${lastElement}`);
      console.log(response.data);
      setBackendData(response.data);

    } catch (error) {
      console.error(error);
    }
  }

  const primeraImagen = () => {
    setImagenGrande(dataProduc[0].prod_img);
  }
  const handleClickMiniatura = (imagen) => {
    setImagenGrande(imagen);
  };

 
  
  return (
    <>
    <div className="container" style={{color : '#ffffff'}}>
      <div className="row">
        {/* CONTENEDOR IZQUIERDO */}
        <div className="col-md-6">
          <div className="row">

            <div className="detall_Img">
              <div className="miniaturas">
                <img src={`${urlApi}uploads/${dataProduc[0].prod_img}`} alt="Miniatura 1" onClick={() => handleClickMiniatura(dataProduc[0].prod_img)} />
                <img src={`${urlApi}uploads/${dataProduc[0].prod_img}`} alt="Miniatura 2" onClick={() => handleClickMiniatura(dataProduc[0].prod_img)} />
                <img src={`${urlApi}uploads/${dataProduc[0].prod_img}`} alt="Miniatura 3" onClick={() => handleClickMiniatura(dataProduc[0].prod_img)} />
                <img src={`${urlApi}uploads/${dataProduc[0].prod_img}`} alt="Miniatura 4" onClick={() => handleClickMiniatura(dataProduc[0].prod_img)} />
              </div>
              <div className="imagen-grande">
                <figure>
                  <img src={`${urlApi}uploads/${imagenGrande}`} alt="Imagen Grande" />
                </figure>
              </div>
            </div>

          </div>
        </div>

        {/* CONTENEDOR DERECHO */}
        <div className="col-md-6">
          <div className="row">
            <h3>{dataProduc[0]?.prod_nom}</h3>

              { dataProduc[0]?.prod_precio_dcto > 0 ? (
                <>    
                <div className="col-6 noVenta">
                  <strike>
                    $ {dataProduc[0]?.prod_precio}
                  </strike>
                </div>

                <div className="col-6 venta">
                  $ {(dataProduc[0]?.prod_precio * dataProduc[0]?.prod_precio_dcto) / 100}
                </div>
                </>
              ) : (
                <div className="col-12 venta">
                  $ {dataProduc[0]?.prod_precio}
                </div>  
              )}

            <div className="col-12">
              <p className='detall_Parra'>
                {dataProduc[0]?.prod_desc}
              </p>
            </div>

            <div className="col-md-12">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <img className="img-fluid tv_icon" src={`/img/icon/icon_maca.svg`} alt="" /></td>
                    <td>{dataProduc[0]?.prod_marca}</td>
                  </tr>
                  <tr>
                    <td><img className="img-fluid tv_icon" src={`/img/icon/icon_modelo.svg`} alt="" /></td>
                    <td>{dataProduc[0]?.prod_model}</td>
                  </tr>
                  <tr>
                    <td><img className="img-fluid tv_icon" src={`/img/icon/icon_categoria.svg`} alt="" /></td>
                    <td>{dataProduc[0]?.prod_cate}</td>
                  </tr>
                  <tr>
                    <td><img className="img-fluid tv_icon" src={`/img/icon/icon_stock.svg`} alt="" /></td>
                    <td>{dataProduc[0]?.prod_stock}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="col-md-6 d-flex justify-content-between align-items-center">
              <Estrellas data={5} />
            </div>
            <div className="col-md-6 d-flex justify-content-between align-items-center">
              <BtnAgregarCar 
                data={dataProduc[0]}
                agregarAlCarrito={agregarAlCarrito}
                tipo={'lang'}
                />
            </div>
          </div>
        </div>

        {/* COMENTARIO */}
        <div className="col-md-12 pt-5 pb-3">
        {dataComent.map((coment, index) => 
          <div className="row coment_cont" key={index}>

              <div className="col-md-1">
                <picture>
                  <img src={`${baseURL}img/clientes/${coment.cli_foto}.jpeg`} className="coment_cont_img" alt="" />
                </picture>
              </div>
              <div className="col-md-6 pt-3">
                <div className="row">
                  <div className="col-6 text-left">
                    <h3> {coment.cli_nom} </h3>
                  </div>
                  <div className="col-6 text-right">
                    <Estrellas data={coment.opi_valor} />
                  </div>
                  <div className="col-12 pt-2 pb-2">
                    <p> {coment.opi_comen} </p>
                  </div>
                  <div className="col-12">
                    <p className='text-right'> {coment.opi_fech} </p>
                  </div>
                </div>
              </div>

            </div>
        )}
        </div>          

        {/* RELACIONADOS */}
        <div className="col-md-12 pt-5 pb-5">
          <CardProduct className='detall_sugerencias'
            data={backendData}
            agregarAlCarrito={agregarAlCarrito}
            />
        </div>

      </div>

      {/* <BarMenu /> */}
    </div>
    </>
  )
}