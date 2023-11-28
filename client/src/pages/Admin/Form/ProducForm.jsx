import React, { useEffect, useRef, useState } from 'react'
import { ProductsApi, showAlert, showAlertPregunt, urlApi } from '../../../Js/functions.js';
//import { InputPers } from '../../components/Input/Input.jsx';
//import { useForm } from '../../hook/userForm';
import './Style.form.css';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

export const ProducForm = ({
    resultData,
    setResultData,
    updateData,
    deleteData,
    setUpdateData,
    setDeleteData,
    showModal,
    setShowModal,
    openModal,
    titleForm,
    setTitleForm

  }) => {

  const urlModul = 'product/';

  const [error, setError] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState('');
  const [operacion, setOperacion] = useState(1);  

  const [prod_id, setProd_id] = useState('');
  const [prod_nom, setProd_nom] = useState('');
  const [prod_desc, setProd_desc] = useState('');
  const [prod_precio, setProd_precio] = useState('');
  const [prod_dcto, setProd_dcto] = useState('');
  const [prod_precio_dcto , setProd_precio_dcto] = useState('');
  const [prod_marca, setProd_marca] = useState('');
  const [prod_model, setProd_model] = useState('');
  const [prod_cate, setProd_cate] = useState('');
  const [prod_stock, setProd_stock] = useState('');
  const [prod_calif, setProd_calif] = useState('');

  const reference = useRef();

  const uploadFiles = () => {
    reference.current.click();
  }  

  useEffect(() => {
    handleDcto();
  }, [prod_precio_dcto]);

  useEffect(() => {
    if(updateData === ''){
      console.log(updateData);
    } else {
      handleUpdate(updateData);
    }
  }, [updateData]);

  useEffect(() => {
    if(deleteData === ''){
      console.log(deleteData);
    } else {
      handleDelete(deleteData);
    }
  }, [deleteData]);
    
  useEffect(() => {
    if(imagen){
      if(imagen instanceof Blob){
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result.toString())
        }
        reader.readAsDataURL(imagen)
      } else {
        setPreview(`${urlApi}uploads/${imagen}`);
      }
    } else {      
      setPreview('');
    }
  },[imagen])

  useEffect(() => {  
    fetchData();
  }, [prod_nom]);

  //MOSTRAR FORMULARIO
  useEffect(() => {
    let handleKeyDown = (event) => {
      if (event.ctrlKey && event.altKey && event.key === 'n') {
        openModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  //USO DE ESCAPE
  useEffect(() => {
    let handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        openModal(false);
        limpiarInput();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await ProductsApi.get(`${urlModul}api/`);
      console.log(response.data);
      setResultData(response.data);

    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdate = async (id) => {
    
    try {
      const response = await ProductsApi.get(`${urlModul}/${id}`);
      console.log(response.data);
      setResultData(response.data);
      
      setProd_id(response.data[0].prod_id);
      setProd_nom(response.data[0].prod_nom);
      setProd_desc(response.data[0].prod_desc);
      setProd_precio(response.data[0].prod_precio);
      setProd_precio_dcto(response.data[0].prod_precio_dcto);
      setProd_marca(response.data[0].prod_marca);
      setProd_model(response.data[0].prod_model);
      setProd_cate(response.data[0].prod_cate);
      setProd_stock(response.data[0].prod_stock);
      setProd_calif(response.data[0].prod_calif);
      setImagen(response.data[0].prod_img);

      setOperacion(2);
      openModal(true);
      setTitleForm('Actualizar Producto')
      setUpdateData('');
      handleDcto();

    } catch (error) {
      console.error(error);
    }
  }

  const limpiarInput = () => {
    setProd_id('');
    setProd_nom('');
    setProd_desc('');
    setProd_precio('');
    setProd_precio_dcto('');
    setProd_marca('');
    setProd_model('');
    setProd_cate('');
    setProd_stock('');
    setProd_calif('');
    setImagen(null);
    setTitleForm('');
  }

  const onProducto = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    formData.append('prod_img', imagen);
    const dataForm = Object.fromEntries(formData);

    console.log(dataForm);


    switch (operacion) {
      case 1:
        try {
          const response = await ProductsApi.post(`${urlModul}`, dataForm, {
            headers: {
            'Content-Type': 'multipart/form-data',
          },
          });
          
          showAlert('Agregado con Exito', 'success');
          console.log(`%cCreado!`,
              `color: yellow;
              font-family:system-ui;
              font-size:1.2rem;
              -webkit-text-stroke: 1px black;
              font-weight:bold`);
              fetchData();
              setShowModal(false);
              limpiarInput();
              console.log(response.data);
          
        } catch (error) {
          console.error(error);
          showAlert(error.response.data, 'error');
        } 

          //setError(false);
        break;

      case 2:
        try {
          const response = await ProductsApi.put(`${urlModul}/${prod_id}`, dataForm, {
            headers: {
            'Content-Type': 'multipart/form-data',
          },
          });
          showAlert('Agregado con Exito', 'success');
          console.log(`%cActualizar!`,
              `color: green;
              font-family:system-ui;
              font-size:1.2rem;
              -webkit-text-stroke: 1px black;
              font-weight:bold`);
            fetchData();
            limpiarInput();
            setShowModal(false);
            console.log(response.data);
          
        } catch (error) {
          console.error(error);
          showAlert(error, error.response.data);
        } 


        break;
        
      default:
        // Acción no válida
        console.log('Acción no válidaa');
        return;

    }
  }

  const handleDcto = () => {
    let montoDcto = (prod_precio * prod_precio_dcto)/100;
    setProd_dcto(montoDcto);

  }

  const handleDelete = (id) => {

    Swal.fire({
      title: '¿Estás seguro?',
      text: `Esta acción no se puede deshacer ${id} `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          const response = ProductsApi.delete(`${urlModul}${id}`);
          console.log(response.data);
          fetchData();
          setDeleteData(id);
          showAlert('Eliminado con Éxito!', 'success');
    
        } catch (error) {
          console.error(error);
        } 
      }
    });
  }

  const closeModal = () => {
    limpiarInput();
    setShowModal(false);
  }

  return (
    <>
    <Modal className='modal-xl contModalForm' show={showModal} onHide={closeModal}> 

    <Modal.Header closeButton>
      <Modal.Title> {titleForm} </Modal.Title>
    </Modal.Header>

    <form onSubmit={onProducto} encType="multipart/form-data">
    <Modal.Body>
      <div className='container pb-3'>
        <div className='row'>
        
          <div className="col-md-6">
            <div className="input-group" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '400px', overflow: 'hidden'}}>
              <input 
                accept='image/*'
                type="file"
                style={{display: 'none'}}
                ref={reference}
                className="form-control"
                id="prod_img"
                name='prod_img'
                onChange={(e) => {
                  const file = e.target.files[0]
                  if(file && file.type.substring(0,5)==='image'){
                    setImagen(file)
                  } else {
                    setImagen(null)
                  }
                }}
                />
                {
                  imagen
                  ? <img src={preview} onClick={uploadFiles} style={{height: '100%', objectFit: 'cover'}} />
                  : <img src={imagen
                    ? `img/productos/${resultData[0].prod_img}`
                    : 'img/icon/img-defect4x4.svg'
                    } style={{height: '100%', objectFit: 'cover'}}  onClick={uploadFiles} />
                }
            </div>
          </div>

          <div className="col-md-6">
            <div className="row">

              <input 
                type="hidden"
                name='prod_id'
                id='prod_id'
                value={prod_id}
                onChange={(e) => setProd_id(e.target.value)}
                /* autoComplete='off' */
                />


              <div className='col-md-12 inputBox'>
                <input
                  type="text"
                  name='prod_nom'
                  id='prod_nom'
                  value={prod_nom}
                  onChange={(e) => setProd_nom(e.target.value)}
                  /* autoComplete='off' */
                  />
                <label
                className={prod_nom.length > 0 ? 'active' : ''}>
                  Nombre </label>
              </div>

              <div className='col-md-4 inputBox'>
                <input
                  type="number"
                  name='prod_precio'
                  id='prod_precio'
                  value={prod_precio}
                  onChange={(e) => setProd_precio(e.target.value)}
                  /* autoComplete='off' */
                  />
                <label className={prod_precio > 0 ? 'active' : ''} htmlFor='prod_precio'> Precio </label>
              </div>
        
              <div className='col-md-2 inputBox'>
                <input
                  type="number"
                  name='prod_precio_dcto'
                  id='prod_precio_dcto'
                  value={prod_precio_dcto}
                  onChange={(e) => setProd_precio_dcto(e.target.value)}
                  /* autoComplete='off' */
                />
                <label className={prod_precio_dcto > 0 ? 'active' : ''} htmlFor='prod_precio_dcto'> DCTO </label>
              </div>

              <div className='col-md-4 inputBox'>
                <input
                  type="number"
                  name='prod_dcto'
                  id='prod_dcto'
                  value={prod_dcto}
                  onChange={(e) => setProd_dcto(e.target.value)}
                  /* autoComplete='off' */
                  disabled
                />
                <label className={prod_dcto > 0 ? 'active' : ''} htmlFor='prod_precio_dcto'> Precio DCTO </label>
              </div>

              <div className='col-md-2 inputBox'>
                <input
                  type="number"
                  name='prod_stock'
                  id='prod_stock'
                  value={prod_stock}
                  onChange={(e) => setProd_stock(e.target.value)}
                  /* autoComplete='off' */
                />
                <label className={prod_stock > 0 ? 'active' : ''} htmlFor='prod_stock'> Stock </label>
              </div>

              <div className='col-md-4 inputBox'>
              <input
                  list="listProd_cate"
                  name='prod_cate'
                  id='prod_cate'
                  value={prod_cate}
                  onChange={(e) => setProd_cate(e.target.value)}
                />
                <label className={prod_cate.length > 0 ? 'active' : ''} htmlFor='prod_cate'> Categoria </label>

                <datalist id="listProd_cate">
                  <option value="videojuegos de roll" />
                  <option value="videojuegos de futbol" />
                  <option value="videojuegos de carros" />
                  
                </datalist >
              </div>

              <div className='col-md-4 inputBox'>
                <input
                  list="listProd_marca"
                  name='prod_marca'
                  id='prod_marca'
                  value={prod_marca}
                  onChange={(e) => setProd_marca(e.target.value)}
                />
                <label className={prod_marca.length > 0 ? 'active' : ''} htmlFor='prod_marca'> Marca </label>

                <datalist id="listProd_marca">
                  <option value="sony" />
                  <option value="xbox" />
                  
                </datalist >
              </div>
              
              <div className='col-md-4 inputBox'>
                <input
                  type="text"
                  name='prod_model'
                  id='prod_model'
                  value={prod_model}
                  onChange={(e) => setProd_model(e.target.value)}
                  /* autoComplete='off' */
                />
                <label className={prod_model.length > 0 ? 'active' : ''} htmlFor='prod_model'> Modelo </label>
              </div>

              <div className='col-md-12 inputBox'>
                <input
                  type="number"
                  name='prod_calif'
                  id='prod_calif'
                  value={prod_calif}
                  onChange={(e) => setProd_calif(e.target.value)}
                  /* autoComplete='off' */
                />
                <label className={prod_calif.length > 0 ? 'active' : ''} htmlFor='prod_calif'> Calificación </label>
              </div>
              
              <div className='col-md-12 inputBox'>
                <textarea
                  type="textArea"
                  name='prod_desc'
                  id='prod_desc'
                  cols="30"
                  rows="3"
                  value={prod_desc}
                  onChange={(e) => setProd_desc(e.target.value)}
                  /* autoComplete='off' */
                ></textarea>
                <label className={prod_desc.length > 0 ? 'active' : ''} htmlFor='prod_desc'> Descripción </label>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Modal.Body>

    <Modal.Footer>
      <div className="col-12">
        <div className="row d-flex d-flex justify-content-around">
        <button type='button' onClick={closeModal} className='btn primary-lin col-5 ml-2'> Cancelar </button>
        <button type='submit' className='btn primary col-5'> Enviar   </button>
      </div>    
      </div>    
    </Modal.Footer>
    </form>
    
    </Modal>
    </>
  )
}