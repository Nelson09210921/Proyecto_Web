import React from 'react';
import '../style/calidad.css'

export const Calidad = () => {

  return (
    <div className="support-page">
      <h1>Soporte Técnico - Tienda de Videojuegos</h1>
      <div className="faq-section">
        <h2>Preguntas Frecuentes</h2>
        <ul>
          <li>¿Cómo puedo contactar al soporte técnico?</li>
          <li>¿Cuáles son los requisitos mínimos del sistema para jugar a cierto juego?</li>
          <li>¿Qué debo hacer si tengo problemas con un código de descarga?</li>
          {/* Agrega más preguntas frecuentes según sea necesario */}
        </ul>
      </div>
      <div className="contact-section">
        <h2>Contacto</h2>
        <p>Si necesitas asistencia adicional, contáctanos en:</p>
        <p>Email: soporte@tiendadevideojuegos.com</p>
        <p>Teléfono: 123-456-7890</p>
      </div>
    </div>
  );


}