import React, { useEffect, useState } from 'react'
import { Tablas } from '../../../components/Tablas/Tablas';
import { ProducForm } from '../Form/ProducForm';
import { Button } from 'react-bootstrap';
import { urlApi } from './../../../Js/functions';
import './ProductosAdmin.Style.css';


export const ProductosAdmin = () => {

  const [resultData, setResultData] = useState([{}]);
  const [updateData, setUpdateData] = useState('');
  const [deleteData, setDeleteData] = useState('');
  const [showModal,  setShowModal] = useState(false);
  const [titleForm,  setTitleForm] = useState('');
  
  const openModal = () => {
    setShowModal(true);
    setTitleForm('Crear Producto');
  }
  
  const columns = [
    {
        name: 'prod_id',
        selector: 'id',
        sortable: true,
    },
    {
        name: 'prod_img',
        options: {
            customBodyRender: (value) => {
              return (
                !value
                ? <img src={`img/icon/img-defect.svg`} alt={value}  className="imgTable"/>
                : <img
                src={`${urlApi}uploads/${value}`}
                alt="Avatar" className="imgTable" />
              );
            },
        },
        sortable: true,
    },
    {
        name: 'prod_nom',
        selector: 'nombre',
        sortable: true,
    },
    {
        name: 'prod_precio',
        selector: 'monto',
        sortable: true,
    },
    {
        name: 'prod_cate',
        selector: 'categoria',
        sortable: true,
    },
    {
        name: 'prod_stock',
        selector: 'stock',
        sortable: true,
    },
    {
        name: "Actions",
        options: {
        customBodyRender: (value, tableMeta) => {
            const primaryKey = tableMeta.rowData[0];
            return (
            <div className='contBtnTable'>
                <button type='button' className='btn btnCar4x4' onClick={() => setUpdateData(primaryKey)}>
                    <img  src={`img/icon/edit.svg`} alt={value} />
                </button>
                <button type='button' className='btn btnCar4x4' onClick={() => setDeleteData(primaryKey)}>
                    <img src={`img/icon/delete.svg`} alt={value} />
                </button>
            </div>
        );
        },
        },
    },
  ];
 
  /* const options = [
  ]; */

  return (
    <>

      <div className='container'>
      <div className='contTitle'>
        <h1> Productos </h1>
        <Button onClick={openModal} className='mb-3'>
          <i className="fa-solid fa-plus"></i>
        </Button>
      </div>

      <Tablas
        data={resultData}
        columns={columns}
        //options={options}
        />
    </div>
    
    <ProducForm
      resultData={resultData}
      setResultData={setResultData}
      updateData={updateData}
      setUpdateData={setUpdateData}
      deleteData={deleteData}
      setDeleteData={setDeleteData}
      showModal={showModal}
      setShowModal={setShowModal}
      openModal={openModal}
      titleForm={titleForm}
      setTitleForm={setTitleForm}
      /> 
   
    </>
  )
}


