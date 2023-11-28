import React, { useEffect, useState } from 'react';
import { BarMenu } from '../components/BarMenu/barMenu';
import { CardProduct } from '../components/CardProduct/CardProduct';
import { ProductsApi } from '../Js/functions';

export const Productos = ({agregarAlCarrito}) => {

  const urlModul = 'product/';
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetchData()
  }, []);

  async function fetchData() {
    try {
      const response = await ProductsApi.get(`${urlModul}api/`);
      console.log(response.data);
      setBackendData(response.data);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
    <div className="container">

      <BarMenu />
      <CardProduct data={backendData} agregarAlCarrito={agregarAlCarrito}/>
    </div>
    </>
  )
}