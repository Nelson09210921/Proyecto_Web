import React from 'react'
import './main.css'
import MyCarousel from '../MyCarousel/MyCarousel'
import fondohome1 from '../../Assets/fondohome1.jpeg'
import fondohome2 from '../../Assets/fondohome2.jpeg'
import fondohome3 from '../../Assets/fondohome3.jpeg'
import fondohome4 from '../../Assets/fondohome4.jpeg'
import fondohome5 from '../../Assets/fondohome5.jpeg'
import fondohome6 from '../../Assets/fondohome6 .jpeg'
import {BsCalendar2Date} from 'react-icons/bs'
import {RiMoneyDollarCircleFill} from 'react-icons/ri'
import {PiShootingStar} from 'react-icons/pi'
import {LiaCartArrowDownSolid} from 'react-icons/lia'




import fondomain from '../../Assets/fondomain.mp4'



const Data = [
  {
   id:1,
   inmSrc: fondohome1,
   destTitle:'Nombre Del juego',
   fechalanzamiento:'03/02/2020',
   precio:100,
   puntuacion:5,
   descripcion:'Informacion Informacion Informacion Informacion Informacion InformacionInformacion InformacionInformacion Informacion Informacion InformacionInformacion InformacionInformacion Informacion'
  },
  {
    id:2,
    inmSrc: fondohome2,
    destTitle:'Nombre Del juego',
    fechalanzamiento:'03/02/2020',
    precio:100,
    puntuacion:5,
    descripcion:'Informacion Informacion Informacion Informacion Informacion InformacionInformacion InformacionInformacion Informacion Informacion InformacionInformacion InformacionInformacion Informacion'
 
 
   },
   {
    id:3,
    inmSrc: fondohome3,
    destTitle:'Nombre Del juego',
    fechalanzamiento:'03/02/2020',
    precio:100,
    puntuacion:5,
    descripcion:'Informacion Informacion Informacion Informacion Informacion InformacionInformacion InformacionInformacion Informacion Informacion InformacionInformacion InformacionInformacion Informacion'
 
 
   },
   {
    id:4,
    inmSrc: fondohome4,
    destTitle:'Nombre Del juego',
    fechalanzamiento:'03/02/2020',
    precio:100,
    puntuacion:'5',
    descripcion:'Informacion Informacion Informacion Informacion Informacion InformacionInformacion InformacionInformacion Informacion Informacion InformacionInformacion InformacionInformacion Informacion'
 
 
   },
   {
    id:5,
    inmSrc: fondohome5,
    destTitle:'Nombre Del juego',
    fechalanzamiento:'03/02/2020',
    precio:100,
    puntuacion:'5',
    descripcion:'Informacion Informacion Informacion Informacion Informacion InformacionInformacion InformacionInformacion Informacion Informacion InformacionInformacion InformacionInformacion Informacion'
 
 
   },
   {
    id:6,
    inmSrc: fondohome6,
    destTitle:'Nombre Del juego',
    fechalanzamiento:'03/02/2020',
    precio:100,
    puntuacion:'5',
    descripcion:'Informacion Informacion Informacion Informacion Informacion InformacionInformacion InformacionInformacion Informacion Informacion InformacionInformacion InformacionInformacion Informacion'
 
 
   }]


const Main = () => {
  return (
    <section className='main container section'>
      
      <MyCarousel/>

      <div className="secContent grid">
        {
        Data.map(({id, inmSrc, destTitle, fechalanzamiento, precio, 
          puntuacion, descripcion})=>{
            return(
              <div key={id} className="singleDestination">

                <div className="imageDiv">
                <img src={inmSrc} alt={destTitle}/>
                </div>

                <div className="cardInfo">
                  <h4 className='destTitle'>{destTitle}</h4>
                  <span className="continent flex">
                    <BsCalendar2Date className='icon'/>
                    <span className='name'>{fechalanzamiento}</span>
                  </span>

                  <div className="fees flex">
                  <div className="puntuacion">
                      <PiShootingStar className='icon'></PiShootingStar>
                      <span>{puntuacion} Estrellas</span>
                    </div>
                    <div className="precio">
                      <RiMoneyDollarCircleFill className='icon'></RiMoneyDollarCircleFill>
                      <span>{precio} </span>
                    </div>
                    
                  </div>

                  <div className="desc">
                    <p>{descripcion}</p>
                  </div>

                  <button className='btn flex'>
                    Comprar<LiaCartArrowDownSolid className='icon'/>
                  </button>


                </div>
                 
              </div>
            )

        })
      }
      </div>
      
    </section>
  )
}

export default Main
