import React, { useContext, useState } from 'react'
import './NavBarVer.Style.css'
import { ItemNavVer } from '../ItemNavVer/ItemNavVer.jsx' 
import { counterContext } from '../../context/counterContex';
import { urlApi } from '../../Js/functions';

export default function NavBarVer () {

    const { state, closetSesion } = useContext(counterContext);
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const itemBarHor =[
        {
            text: 'Usuario',
            to: '/user_admin',
            icon: 'fa-solid fa-user',
        },
        {
            text: 'Productos',
            to: '/prod_admin',
            icon: 'fa-solid fa-store',
        },
        {
            text: 'Paginas',
            to: '/paginas',
            icon: 'fa-solid fa-sitemap',
        },
        {
            text: 'Reportes',
            to: '/reportes',
            icon: 'fa-solid fa-chart-line',
        },
    ]

  return (
    <>
    {state[0]?.logged ? (
        <div className={`navBarVer ${isOpen ? '' : 'open'}`}>
            <div className='contItem'>
                <div className="navbar-toggle btn-4x4" onClick={toggleNavbar}>
                    <i className="fas fa-bars"></i>
                </div>
                <div>
                </div>
                {itemBarHor.map(({to, text, icon}, index) => 
                    <ItemNavVer key={index} to={to} text={text} icon={icon} />
                    )}
            </div>

            <div className={isOpen ? 'contPerfilCloset' : 'contPerfil'}>
                <div>
                    <img src={state[0]?.foto !== '' 
                    ? `${urlApi}uploads/${state[0]?.foto}`
                    : 'img/icon/img-defect4x4.svg'}
                    alt="" />

                    <p className='nameUser'>
                        { state[0]?.username }
                    </p>
                </div>
                <div>
                    <button className='btn-4x4' onClick={closetSesion}>
                        <i className="fa-solid fa-power-off"></i>
                    </button>
                </div>
            </div>
        </div>
    ) : (
        ""
    )}
    
    </>
  )
}
