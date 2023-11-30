import { useEffect, useState } from "react"

export const BtnAgregarCar = ({ data, agregarAlCarrito, tipo }) => {


  return (
    <>
        {tipo ? (
          <button className='btnA btnPrimary' disabled={data.prod_stock < 1} onClick={() => agregarAlCarrito(data)}>
              {data.prod_stock > 0 ?
                <span> Subir al carro  </span>
                :
                <span> Sin Stock  </span>
              }
          </button>

        ) : (
          <button className='btnA btnCar4x4' disabled={data.prod_stock < 1} onClick={() => agregarAlCarrito(data)}>
              { data.prod_stock }
              { 
               data.prod_stock > 0 ?
               <i className="fa-solid fa-cart-shopping"></i>
               :
               <i className="fa-solid fa-solid fa-ban"></i>
               }
          </button>
        )}
    </>
  )
}
