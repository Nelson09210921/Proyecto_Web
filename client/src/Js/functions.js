import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export function showAlert(msj, icono, foco='') {

    onFocus(foco);
    const MySwal =  withReactContent(Swal);
    MySwal.fire({
        title: msj,
        icon: icono
    });
}

export function showAlertPregunt(id, siConfirma, foco='') {

    onFocus(foco);
    const MySwal =  withReactContent(Swal);
    const { value } = MySwal.fire({
        title: '¿Estás seguro?',
        text: `Eliminara a ${id}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      });
        /*
        .then((result) => {
        if (result.isConfirmed) {
            /* siConfirma(id); 
            const respuesta = result.isConfirmed;
            return respuesta;
        }
        }); 
        */
    if (value) {
        return value;
    } else {
        return null;
    }
}

export const ProductsApi = axios.create({
    baseURL: 'http://localhost:4888/'
})

function onFocus(foco){
    if(foco !== ''){
        document.getElementById(foco).focus();
    }
}

export const urlApi = 'http://localhost:4888/';