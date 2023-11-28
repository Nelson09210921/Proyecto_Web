import React from 'react'
import './CardIcon.Style.css'

export const CardIcon = ({ icon, text, msj }) => {
  return (
    <>
    <div className="cardIcon">
        <img src={`./img/icon/${icon}.svg`} alt="" />
        <div>
            <h3> {text} </h3>
            <h6> {msj} </h6>
        </div>
    </div>
    </>
  )
}