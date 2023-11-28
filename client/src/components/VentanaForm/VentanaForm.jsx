import React, { useEffect } from 'react'
import { Modal } from 'react-bootstrap';
import { ProducForm } from '../../pages/Admin/Productos/ProducForm.js'
import 'bootstrap/dist/css/bootstrap.min.css';

export const VentanaForm = ({resultData, showModal, setShowModal, openModal, setResultData, titleModal, value}) => {
  
  /* ATAJOS DE TECLADO */
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.altKey && event.key === 'n') {
        openModal(1);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

 
    return(
    <>
    <Modal className='modal-xl' show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
        <Modal.Title>{titleModal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ProducForm
            resultData={resultData}
            setResultData={setResultData}
            setShowModal={setShowModal}
            value={value}
            resultData={resultData}
            />
        </Modal.Body>

        {/*
        <Modal.Footer>
        <button
            variant="secondary"
            className='btn primary-lin col-6'
            onClick={() =>    setShowModal(false)}>
                Cerrar
        </button>
         <button variant="primary" onClick={handleSave}>
            Guardar
        </button>
        </Modal.Footer>
        */}
    </Modal>
    </>
    )
    }