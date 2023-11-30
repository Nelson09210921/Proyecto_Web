import React from 'react'
import { Link } from 'react-router-dom'
import './Style.css'

export const ItemNavVer = ({to, text, icon}) => {
  return (
    <Link to={to} className='itemNavVer'>
        <p> {text} </p>
        <div className='icon'>
          <i className={icon}></i>
        </div>
    </Link>
  )
}