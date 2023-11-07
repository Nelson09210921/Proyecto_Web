import React, {useState} from 'react'
import './navbar.css'
import {BiSolidGame} from 'react-icons/bi'
import {IoIosCloseCircle} from 'react-icons/io'
import {CgMenuGridO} from 'react-icons/cg'




//Barra de navegacion principal

const Navbar = () => {
  const [active, setActive] = useState('navBar')
  const showNav =()=>{
    setActive('navBar activeNavbar')
  }
  const hideNav =()=>{
    setActive('navBar')
  }

  return (
    <section className='navBarSection'>
      <header className="header flex">

        <div className="logoDiv">
          <a href="#" className="logo flex">
            <h1><BiSolidGame className="icon"/> Gameting</h1>
          </a>
        </div>

        <div className={active}>

          <ul className="navLists flex">

            <li className="navItem">
              <a href="#" className="navLink">Home</a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">Especiales</a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">Productos</a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">Acerca de</a>
            </li>

            <li className="navItem">
              <a href="#" className="navLink">Proxx</a>
            </li>
            

            <button className='btn'>
              <a href='#'>Sing up</a>
            </button>
          </ul>

          <div onClick={hideNav} className="closeNavbar">
            <IoIosCloseCircle className="icon"/>
          </div>
        </div>

        <div onClick={showNav} className="toggleNavbar">
          <CgMenuGridO className="icon"/>
        </div>
        
      </header>

    </section>
  )
}

export default Navbar