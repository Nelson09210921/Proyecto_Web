import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Requerido para los estilos del carousel
import fondohome1 from '../../Assets/fondohome1.jpeg'
import fondohome2 from '../../Assets/fondohome2.jpeg'
import fondohome3 from '../../Assets/fondohome3.jpeg'
import fondohome4 from '../../Assets/fondohome4.jpeg'
import fondohome5 from '../../Assets/fondohome5.jpeg'
import fondohome6 from '../../Assets/fondohome6 .jpeg'

const MyCarousel = () => {
  return (
    <Carousel>
      <div>
        <img src={fondohome1} alt="fondo1" />
        <p className="legend">fondohome1</p>
      </div>
      <div>
        <img src={fondohome2} alt="fondo2" />
        <p className="legend">fondohome2</p>
      </div>
      <div>
        <img src={fondohome3} alt="fondo3" />
        <p className="legend">fondohome3</p>
      </div>
      <div>
        <img src={fondohome4} alt="fondo4" />
        <p className="legend">fondohome1</p>
      </div>
      <div>
        <img src={fondohome5} alt="fondo5" />
        <p className="legend">fondohome2</p>
      </div>
      <div>
        <img src={fondohome6} alt="fondo6" />
        <p className="legend">fondohome3</p>
      </div>
    </Carousel>
  );
};

export default MyCarousel;