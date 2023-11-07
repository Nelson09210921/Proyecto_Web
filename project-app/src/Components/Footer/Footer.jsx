import React from 'react'
import './footer.css'
import {FaFacebook} from 'react-icons/fa6'
import {BiLogoInstagram} from 'react-icons/bi'
import {FaSquareTwitter} from 'react-icons/fa6'
import {AiFillLinkedin} from 'react-icons/ai'

const Footer = () => {
  return (
    <section className='footer'>
    <div className="container">
      <div className="footer-row">
        <div className="footer-links">
          <h4>Company</h4>
          <ul>
            <li><a href="#">Nosotros</a></li>
            <li><a href="#">Nuestyros servicios</a></li>
            <li><a href="#">Politica de privacidad</a></li>
            <li><a href="#">Afiliate</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Ayuda</h4>
          <ul>
            <li><a href="#">Preguntas</a></li>
            <li><a href="#">Compras</a></li>
            <li><a href="#">Envios</a></li>
            <li><a href="#">Estados de orden</a></li>
            <li><a href="#">pago</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Siguenos</h4>
          <div className="social">
            <a href='#'><i className="fab fa-facebook-f"><FaFacebook className="icon"/></i></a>
            <a href='#'><i className="fab fa-instagram"></i><BiLogoInstagram className="icon"/></a>
            <a href='#'><i className="fab fa-twitter"></i><FaSquareTwitter className="icon"/></a>
            <a href='#'><i className="fab fa-linkedin"></i><AiFillLinkedin className="icon"/></a>
          </div>
        </div>
      </div>
    </div>

  </section>
  )
}

export default Footer