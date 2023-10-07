import React from 'react'
import './navbar.css'
import {BiSolidGame} from 'react-icons/bi'
import {IoIosCloseCircle} from 'react-icons/io'
import {PiDotsSixVerticalThin} from 'react-icons/pi'

//Barra de navegacion principal

const Navbar = () => {
  return (
    <section className='navBarSection'>
      <header className="header flex">

        <div className="logoDiv">
          <a href="#" className="logo flex">
            <h1><BiSolidGame className="icon"/> Logooo</h1>
          </a>
        </div>

        <div className="navBar">

          <ul className="navList flex">

            <li className="nabItem">
              <a href="#" className="navLink">Home</a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">Navbar1</a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">Navbar2</a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">Navbar3</a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">Navbar4</a>
            </li>

            <button className='btn'>
              <a href='#'>Hacer algo</a>
            </button>
          </ul>

          <div className="closeNavbar">
            <IoIosCloseCircle className="icon"/>
          </div>
        </div>

        <div className="toggleNavbar">
          <PiDotsSixVerticalThin className="icon"/>
        </div>
        
      </header>

    </section>
  )
}

export default Navbar