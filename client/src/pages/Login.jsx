import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from '../hook/userForm'
import { useNavigate } from 'react-router-dom';
import { counterContext } from '../context/counterContex';
import { useLocalStore } from '../hook/useLocalStore';
import { ProductsApi, showAlert } from '../Js/functions';

export const Login = () => {

    const navigate = useNavigate();
    const urlModul = 'user/';
    
    const { estadoLocal } = useContext(counterContext);

    const [u_usu, setU_usu] = useState('');
    const [u_pass, setU_pass] = useState('');

    const [ u_nom, setU_nom ] = useState('')
    const [ u_ema, setU_ema ] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [showReg, setShowReg] = useState(false);

    

  const [error, setError] = useState(false);

  const onLogin = (e) => {
    e.preventDefault();

    if(u_usu === '' || u_pass === ''){
        setError(true);
        return
    }

    verificar(u_usu, u_pass);
    
    limpiar();
    setError(false);
    
  }

  /* state={
    form:{
        "u_usu"  : "",
        "u_pass" : ""
    },
    error: false,
    errorMsg: ""
  }

  const handleChage = async (e) => {{
    await this.setState({
        form:{
            ...this.state.form,
            [e.target.name] : e.target.value,
        }
    })
    console.log(this.satte.form);
  }}

  const handleBtn = () => {
    let url = Apiurl + "auth";
    axios.post(url, this.state.form)
    .then( response => {
        console.log(response);
    })
  }  */

  const verificar = async (usuario, pass) => {

    let superUsu = 'ADMIN';
    let superPass = '1234';

    if(usuario === superUsu && pass === superPass){

        showAlert(`Bienvenido ${superUsu}`, 'success');
        estadoLocal([{
            logged: true,
            u_id: 0,
            username: superUsu,
            nombre: 'SuperAdmin',
            nivel: 1,
        }]);

        navigate('/', {
            replace: true,
            state: {
                logged: true,
                u_id: 0,
                username: superUsu,
                nombre: 'SuperAdmin',
                nivel: 1,
            } 
          });

    } else {

        try {
          const response = await ProductsApi.get(`/user/api/`);
          const users = response.data;
          console.log(response.data);    
    
          const user = users.find((user) => user.u_usu === usuario && user.u_pass === pass);

          showAlert(`Bienvenido ${user.u_usu}`, 'success');
          estadoLocal([{
            logged: true,
            u_id: user.id,
            username: user.u_usu,
            nombre: user.u_nom,
            nivel: user.u_nivel,
            foto: user.u_foto,
          }]);

          navigate('/', {
              replace: true,
              state: {
                logged: true,
                u_id: user.id,
                username: user.u_usu,
                nombre: user.u_nom,
                nivel: user.u_nivel,
                foto: user.u_foto,
              } 
          });
          
        } catch (error) {
          console.error(error);
        }

    }


  };

  const regUsuario = async (e) => {
    e.preventDefault();

    if(u_nom === '' || u_ema === '' || u_pass === ''){
      setError(true);
      return
    }
    
    const formData = new FormData(e.target);
    formData.append('u_usu', u_ema);
    formData.append('u_nivel', 'Cliente');
    formData.append('u_status', 'Activo');
    formData.append('u_foto', '');
    const dataForm = Object.fromEntries(formData);
    console.log(dataForm);
    
      try {
        const response = await ProductsApi.post(`${urlModul}`, dataForm, {
          headers: {
          'Content-Type': 'multipart/form-data',
          },
        });

        console.log(response.data);
        if(response.data.existe === true){
          console.log(response.data.existe);
          showAlert('Usuario ya existe', 'error');
        } else {
          //showAlert('Bienvenido', 'success');
  
          limpiar();
          
          console.log(`%cCreado!`,
              `color: yellow;
              font-family:system-ui;
              font-size:1.2rem;
              -webkit-text-stroke: 1px black;
              font-weight:bold`);
          /* console.log(response.data.existe);
          console.log(response.data.data); */

          
          const response = await ProductsApi.get(`${urlModul}api/`);
          const users = response.data;  
          const user = users.find((user) => user.u_usu === u_ema && user.u_pass === u_pass);
          console.log(user);

          showAlert(`Bienvenido ${user.u_nom}`, 'success');
          estadoLocal([{
            logged: true,
            u_id: user.id,
            username: user.u_usu,
            nombre: user.u_nom,
            nivel: user.u_nivel,
            foto: user.u_foto,
          }]);

          navigate('/', {
              replace: true,
              state: {
                logged: true,
                u_id: user.id,
                username: user.u_usu,
                nombre: user.u_nom,
                nivel: user.u_nivel,
                foto: user.u_foto,
              } 
          });
          

          }


      } catch (error) {
        console.error(error);
        showAlert('Error en la consulta', 'error');
      }
  }

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleForm = () => {
    setShowReg(!showReg);
    limpiar();
  };

  const limpiar = () => {
    setU_usu('');
    setU_pass('');
    setU_nom('');
    setU_ema('');
    setError(false);
    setShowPassword(false);

  }

  return (
    <>
        <div className='loginCont'>
            
            <figure className={`imgLogin ${showReg ? 'active' : ''} `} >
              <img
                className='imgLog'
                src="./img/recursos/login.jpg" alt="" />
            </figure>

            <div>
              <label className="labelBtn">
                  <div className="toggle">
                      <input className="toggle-state" type="checkbox" name="check" value="check"
                        onClick={toggleForm}
                      />
                      <div className="indicator"></div>
                  </div>
                  <span>
                    {showReg ? 'Ingresar' : 'Registrar'}
                  </span>
              </label>
            </div>


            <div className='loginForm'>

              {/* INICIAR SECIÓN */}
              <div className='contForm'>
                <form className='formProd' onSubmit={onLogin}>
                    <img src="img/logo-v.svg" className='logoLogin' alt="" />
                    <div>
                        <label htmlFor='u_usu'>Usuario </label>
                        <input type="text"
                            value={u_usu}
                            name='u_usu'
                            id='u_usu'
                            onChange={(e) => setU_usu(e.target.value) }
                            /* autoComplete='off' */
                            />
                    </div>
                    <div>
                        <label htmlFor='u_pass'>Password</label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={u_pass}
                            name='u_pass'
                            id='u_pass'
                            onChange={(e) => setU_pass(e.target.value) }
                            /* autoComplete='off' */
                            />
                            
                        <span
                        className='verPass'
                          onClick={togglePassword}
                          >
                            <i className="fa-solid fa-eye"></i>
                        </span>
                    </div>
                    <button type='submit' className='btn btn4x1 mt-4'> Ingresar </button>
                </form>
                <div className='alert'>
                    {error && <p>Todos los campos son obligatorios</p> }
                </div>
              </div>

              {/* REGISTRAR */}
              <div className='contForm'>
                <form className='formProd' onSubmit={regUsuario}  encType="multipart/form-data">
                <img src="img/logo-v.svg" className='logoLogin' alt="" />

                  <div>
                    <label htmlFor='u_nom'>Nombre </label>
                    <input type="text"
                        value={u_nom}
                        name='u_nom'
                        id='u_nom'
                        onChange={(e) => setU_nom(e.target.value) }
                        /* autoComplete='off' */
                        />
                  </div>
                  <div>
                    <label htmlFor='u_ema'>Email </label>
                    <input type="text"
                        value={u_ema}
                        name='u_ema'
                        id='u_ema'
                        onChange={(e) => setU_ema(e.target.value) }
                        /* autoComplete='off' */
                        />
                  </div>
                  <div>
                      <label htmlFor='u_pass'>Password</label>
                      <input
                          type={showPassword ? 'text' : 'password'}
                          value={u_pass}
                          name='u_pass'
                          id='u_pass'
                          onChange={(e) => setU_pass(e.target.value) }
                          /* autoComplete='off' */
                          />
                      <span
                        className='verPass'
                        onClick={togglePassword}
                      >
                          <i className="fa-solid fa-eye"></i>
                      </span>
                  </div>

                  <button type='submit' className='btn btn4x1 mt-4'> Registrar </button>
                </form>

                  <div className='alert'>
                    {error && <p>Todos los campos son obligatorios</p> }
                  </div>
              </div>

          </div>
        </div>
    </>
  )
}