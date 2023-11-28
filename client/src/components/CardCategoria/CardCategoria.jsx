import React from 'react'
import { Link } from 'react-router-dom'

export const CardCategoria = ({
    link,
    mensaje
}) => {
  return (
   <>
    <div className="card h-100">
        <div className="card-body">
        <h3 className='tituloCard'> {link} </h3>
        <p> {mensaje} </p>
        <Link
            to={`/productos/${link}`}
            className='btn4x1'
        > Ver más </Link>
      </div>
    </div>
   </>
  )
}
