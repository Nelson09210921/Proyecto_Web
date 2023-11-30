import React from 'react'
import './CardBaner.Style.css'
import { Link } from 'react-router-dom'

export const CardBaner = ({
    titulo,
    msj,
    url1,
    url2,
    img
}) => {
  return (
    <div className='CardBaner'>
        <figure>
            <img src={`http://localhost:4888/uploads/${img}`} alt="" />
        </figure>
        <div>
            <h1> {titulo} </h1>
            <p> {msj} </p>
            <div>
                <Link to={url1}
                 className='btnA primary-lin-med'
                >VER TODOS</Link>
                <Link to={url2}
                 className='btnA primary-lin-med'
                >LO QUIERO YA</Link>
            </div>
        </div>
    </div>
  )
}
