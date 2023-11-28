import React, { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { counterContext } from '../../context/counterContex';

import './../NavBar/Style.css'

function NavBar () {

    const { couter, increment, decrement, reset, state, closetSesion } = useContext(counterContext);
    const navigate = useNavigate();
    const [ mostrarM, setMostrarM ]= useState(false)

    const mostrarMenu = () => {
        setMostrarM(!mostrarM)
    }

    const itemNavbar = [
        {
            to: '/productos',
            text: 'Articulos',
            icon: 'fa-solid fa-store',
            submenu:[
                {
                    to: '/portafolio/diseño',
                    text: 'diseño'
                },
                {
                    to: '/portafolio/web-site',
                    text: 'web site'
                },
                {
                    to: '/portafolio/audiovisual',
                    text: 'audiovisual'
                },
                {
                    to: '/portafolio/campañas',
                    text: 'campañas'
                },
            ]
        },
        {
            to: '/calidad',
            text: 'Calidad',
            icon: 'fa-solid fa-bookmark',
        },
        {
            to: '/nosotros',
            text: 'Nosotros',
            icon: 'fa-solid fa-people-group',
            submenu:[
                {
                    to: '/portafolio/diseño',
                    text: 'diseño'
                },
                {
                    to: '/portafolio/web-site',
                    text: 'web site'
                },
                {
                    to: '/portafolio/audiovisual',
                    text: 'audiovisual'
                },
                {
                    to: '/portafolio/campañas',
                    text: 'campañas'
                },
            ]
        },
    ]

  return (
    <>
    <div className='navbar'>
      <nav>
        <div>
            <Link to="/">
                <img className='nav-logo' src="/img/logo.svg" alt="" />
            </Link>
        </div>
        <div className='itemNav'>
            <ul className={mostrarM ? '' : 'activeMenu'}>
                {itemNavbar.map(({to, text, icon}, index) => 
                    <Link to={to} key={index} className='navbar-item' >
                        <div>
                            <span><i className={icon}></i></span>
                            <div className='nav-text'>
                            <p>{text}</p>  
                            <p>{text}</p>  
                            </div>
                        </div>
                    </Link>
                )}

                <div className="btnClosed" onClick={mostrarMenu}>
                    <i className="fa-solid fa-x"></i>
                </div>
                
            </ul>
            <div className='nav-btn'>
                <Link to='/carrito' className='btn-4x4'>
                    <i className="fa-solid fa-cart-shopping"></i>
                </Link>
                {
                    state[0]?.logged
                    ? (
                        <button className='btn-4x4' onClick={closetSesion}>
                            <i className="fa-solid fa-power-off"></i>
                        </button>
                    ) : (
                        <Link to='/login' className='btn-4x4'>
                            <i className="fa-solid fa-user"></i>
                        </Link>
                    )
                }
                
                <div className='btn-4x4 btnClosed' onClick={mostrarMenu}>
                <i className="fa-solid fa-bars"></i>
                </div>
                
            </div>
        </div>
      </nav>
        
    </div>
    </>
  )
}

export default NavBar;