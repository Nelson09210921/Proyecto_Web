import React, { useEffect, useRef, useState } from 'react'
import { ProductsApi, showAlert, showAlertPregunt, urlApi } from '../../../Js/functions.js';
//import { InputPers } from '../../components/Input/Input.jsx';
//import { useForm } from '../../hook/userForm';
import './Style.form.css';
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';

export const UserForm = ({
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

  const urlModul = 'user/';

  const [error, setError] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [operacion, setOperacion] = useState(1);  


  const [ u_id, setU_id ] = useState('')
  const [ u_ced, setU_ced ] = useState('')
  const [ u_nom, setU_nom ] = useState('')
  const [ u_usu, setU_usu ] = useState('')
  const [ u_pass, setU_pass ] = useState('')
  const [ u_telf, setU_telf ] = useState('')
  const [ u_ema, setU_ema ] = useState('')
  const [ u_nac, setU_nac ] = useState('')
  const [ u_dir, setU_dir ] = useState('')
  const [ u_nivel, setU_nivel ] = useState('')
  const [ u_status, setU_status ] = useState('')
  //const [ u_foto, setU_foto ] = useState(null)


  const reference = useRef();

  const uploadFiles = () => {
    reference.current.click();
  }  

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
    if(image){
      if(image instanceof Blob){
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result.toString())
        }
        reader.readAsDataURL(image)
      } else {
        setPreview(`${urlApi}uploads/${image}`);
      }
    } else {      
      setPreview('');
    }
  },[image])

  useEffect(() => {  
    fetchData();
  }, [u_nom]);

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
      
        setU_id(response.data[0].u_id);
        setU_ced(response.data[0].u_ced);
        setU_nom(response.data[0].u_nom);
        setU_usu(response.data[0].u_usu);
        setU_pass(response.data[0].u_pass);
        setU_telf(response.data[0].u_telf);
        setU_ema(response.data[0].u_ema);
        setU_nac(response.data[0].u_nac);
        setU_dir(response.data[0].u_dir);
        setU_nivel(response.data[0].u_nivel);
        setU_status(response.data[0].u_status);
        setImage(response.data[0].u_foto);

      setOperacion(2);
      openModal(true);
      setTitleForm('Actualizar Usuario')
      setUpdateData('');

    } catch (error) {
      console.error(error);
    }
  }

  const limpiarInput = () => {
    setU_id('');
    setU_ced('');
    setU_nom('');
    setU_usu('');
    setU_pass('');
    setU_telf('');
    setU_ema('');
    setU_nac('');
    setU_dir('');
    setU_nivel('');
    setU_status('');
    setPreview('');
    setImage(null);
  }

  const onProducto = async (e) => {
    e.preventDefault();

    if(u_nom === '' || u_ema === '' || u_pass === ''){
      showAlert('Nombre, Usuario y cntraseña requerido ', 'error');
      return
    }

    const formData = new FormData(e.target);
    formData.append('u_foto', image);
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
    
            if(response.data.existe === true){
              console.log(response.data.existe);
              showAlert('Usuario ya existe', 'error');

            } else {        
              setShowModal(false);
              limpiarInput();
              console.log(`%cCreado!`,
                `color: yellow;
                font-family:system-ui;
                font-size:1.2rem;
                -webkit-text-stroke: 1px black;
                font-weight:bold`);
            }
      
          } catch (error) {
            console.error(error);
            showAlert('Error en la consulta', 'error');
          }
      
        break;

      case 2:
        try {
          const response = await ProductsApi.put(`${urlModul}/${u_id}`, dataForm, dataForm, {
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
            setShowModal(false);
            limpiarInput();
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
      <Modal.Title> {titleForm} {u_nac} </Modal.Title>
    </Modal.Header>

    <form onSubmit={onProducto} encType="multipart/form-data">
    <Modal.Body>
      <div className='container pb-3'>
        <div className='row'>
        
          <div className="col-md-6">
            <div className="input-group" style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '330px', overflow: 'hidden'}}>
              <input 
                accept='image/*'
                type="file"
                style={{display: 'none'}}
                ref={reference}
                className="form-control"
                id="u_foto"
                name='u_foto'
                onChange={(e) => {
                  const file = e.target.files[0];
                  if(file && file.type.substring(0,5)==='image'){
                    setImage(file)
                  } else {
                    setImage(null)
                  }
                }}
                />
                {
                  image
                  ? <img src={preview} onClick={uploadFiles} style={{height: '100%', objectFit: 'cover'}} />
                  : <img src={image
                    ? `${urlApi}user/${resultData[0].u_foto}.jpg`
                    : 'img/icon/img-defect4x4.svg'
                    } style={{height: '100%', objectFit: 'cover'}}  onClick={uploadFiles} />
                }
            </div>
          </div>

          <div className="col-md-6">
            <div className="row">

              <input 
                type="hidden"
                name='u_id'
                id='u_id'
                value={u_id}
                onChange={(e) => setU_id(e.target.value)}
                /* autoComplete='off' */
                />



              <div className='col-md-8 inputBox'>
                <input
                  type="text"
                  name='u_nom'
                  id='u_nom'
                  value={u_nom}
                  onChange={(e) => setU_nom(e.target.value)}
                  /* autoComplete='off' */
                  />
                <label
                className={u_nom.length > 0 ? 'active' : ''} htmlFor='u_nom'>
                  Nombre </label>
              </div>

              <div className='col-md-4 inputBox'>
                <input
                  type="number"
                  name='u_ced'
                  id='u_ced'
                  value={u_ced}
                  onChange={(e) => setU_ced(e.target.value)}
                  /* autoComplete='off' */
                  />
                <label className={u_ced > 0 ? 'active' : ''} htmlFor='u_ced'> Cédula / Nit </label>
              </div>



              <div className='col-md-4 inputBox'>
                <input
                  type="text"
                  name='u_usu'
                  id='u_usu'
                  value={u_usu}
                  onChange={(e) => setU_usu(e.target.value)}
                  /* autoComplete='off' */
                  />
                <label className={u_usu.length > 0 ? 'active' : ''} htmlFor='u_usu'> Usuario </label>
              </div>
        
              <div className='col-md-4 inputBox'>
                <input
                  type="text"
                  name='u_pass'
                  id='u_pass'
                  value={u_pass}
                  onChange={(e) => setU_pass(e.target.value)}
                  /* autoComplete='off' */
                />
                <label className={u_pass > 0 ? 'active' : ''} htmlFor='u_pass'> Contraseña </label>
              </div>

              <div className='col-md-4 inputBox'>
                <input
                  type="date"
                  name='u_nac'
                  id='u_nac'
                  value={u_nac}
                  onChange={(e) => setU_nac(e.target.value)}
                  /* autoComplete='off' */
                />
                <label className='active' htmlFor='u_nac'> Nacimiento </label>
              </div>



              <div className='col-md-4 inputBox'>
                <input
                  type="number"
                  name='u_telf'
                  id='u_telf'
                  value={u_telf}
                  onChange={(e) => setU_telf(e.target.value)}
                  /* autoComplete='off' */
                />
                <label className={u_telf.length > 0 ? 'active' : ''} htmlFor='u_telf'> Teléfono </label>
              </div>

              <div className='col-md-8 inputBox'>
                <input
                  type="email"
                  name='u_ema'
                  id='u_ema'
                  value={u_ema}
                  onChange={(e) => setU_ema(e.target.value)}
                  /* autoComplete='off' */
                />
                <label className={u_ema.length > 0 ? 'active' : ''} htmlFor='u_ema'> Email </label>
              </div>


             

              <div className='col-md-4 inputBox'>
              <input
                  list="listU_nivel"
                  name='u_nivel'
                  id='u_nivel'
                  value={u_nivel}
                  onChange={(e) => setU_nivel(e.target.value)}
                />
                <label className={u_nivel.length > 0 ? 'active' : ''} htmlFor='u_nivel'> Nivel </label>

                <datalist id="listU_nivel">
                  <option value="Admin" />
                  <option value="Cliente" />
                  <option value="Editos" />
                  <option value="Venta" />
                </datalist >
              </div>

              <div className='col-md-4 inputBox'>
              <input
                  list="listU_status"
                  name='u_status'
                  id='u_status'
                  value={u_status}
                  onChange={(e) => setU_status(e.target.value)}
                />
                <label className={u_status.length > 0 ? 'active' : ''} htmlFor='u_status'> Estatus </label>

                <datalist id="listU_status">
                  <option value="Activo" />
                  <option value="Inactivo" />
                  <option value="Suspendido" />
                </datalist >
              </div>



              <div className='col-md-12 inputBox'>
                <textarea
                  type="textArea"
                  name='u_dir'
                  id='u_dir'
                  cols="30"
                  rows="3"
                  value={u_dir}
                  onChange={(e) => setU_dir(e.target.value)}
                  /* autoComplete='off' */
                ></textarea>
                <label className={u_dir.length > 0 ? 'active' : ''} htmlFor='u_dir'> Drección </label>
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