import React from 'react';
import { Link } from 'react-router-dom';
import { CardCategoria } from '../components/CardCategoria/CardCategoria';
import { CardIcon } from '../components/CardIcon/CardIcon';
import { CardBaner } from '../components/CardBaner/CardBaner';
import { Carrusel } from '../components/Carrusel/Carrusel';

export const Home = () => {

    return (
      <>
        <section className='container'>
          <Carrusel
            img={[
              {
                text: '',
                link: '',
                img1: 'imgPort1',
                img2: 'img_1'
              },
              {
                text: '',
                link: '',
                img1: 'imgPort1',
                img2: 'img_2'
              },
              {
                text: '',
                link: '',
                img1: 'imgPort1',
                img2: 'img_3'
              }
            ]}
          />
        </section>

        <section className='container pt-5 pb-5'>
         
        </section>



        <section className='container flexCar pt-5 pb-5   ' style={{color: "000000"}} >
          <CardIcon
            icon="iconCar1"
            text="Domicilio gratis" 
            msj="por orden mayor a $100"
          />
          <CardIcon
            icon="iconCar2"
            text="Ofertas sorpresa diarias"
            msj="ahorra hasta un 25% dcto"
          />
          <CardIcon
            icon="iconCar3"
            text="Soporte 24/7"
            msj="compras con un experto"
          />
          <CardIcon
            icon="iconCar4"
            text="Precios asequibles"   
            msj="precios directo de fabrica"
          />
          <CardIcon
            icon="iconCar5"
            text="Pagos seguros"
            msj="compras 100% protegidas"
          />
        </section>

        <section className='mb-5' style={{background: "#fbfbfb"}}>
          <div className="container" style={{paddingTop: '0'}}>
            <CardBaner
              titulo='Battlefield 2042'
              msj='Es un juego de disparos en primera persona que marca el regreso de la icónica guerra total de la franquicia. Con la ayuda de un arsenal innovador, participa en batallas multijugador intensas e inmersivas.'
              url1='/productos'
              url2='/detalles/1'
              img='p1.jpg'
              />
          </div>
        </section>
      </>
    )
}