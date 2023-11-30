import React, { useEffect, useState } from 'react'
import { Tablas } from '../../../components/Tablas/Tablas';
import { Button } from 'react-bootstrap';
import { urlApi } from './../../../Js/functions';
import './UsuariosAdmin.Style.css';
import { UserForm } from '../Form/UserForm';



export const UsuariosAdmin = () => {

  const [resultData, setResultData] = useState([{}]);
  const [updateData, setUpdateData] = useState('');
  const [deleteData, setDeleteData] = useState('');
  const [showModal,  setShowModal] = useState(false);
  const [titleForm,  setTitleForm] = useState('');
  
  const openModal = () => {
    setShowModal(true);
    setTitleForm('Crear usuario');
  }
  
  const columns = [
    {
        name: 'u_id',
        selector: 'id',
        sortable: true,
    },
    {
        name: 'u_foto',
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
        name: 'u_nom',
        selector: 'nombre',
        sortable: true,
    },
    {
        name: 'u_usu',
        selector: 'usuario',
        sortable: true,
    },
    {
        name: 'u_telf',
        selector: 'telefono',
        sortable: true,
    },
    {
        name: 'u_nivel',
        selector: 'nivel',
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
        <h1> Usuarios </h1>
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

    <UserForm
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


