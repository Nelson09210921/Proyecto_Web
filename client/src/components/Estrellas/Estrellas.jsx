import React, { useEffect, useState } from 'react';
import './Estrellas.style.css'

export const Estrellas = ({data}) => {

    const [calificacion, setCalificacion] = useState(true);

    useEffect(() => {
      setCalificacion(data);
    }, []);

    const Star = ({ calificación }) => {

        const getStarClass = (index) => {
            if (index < calificación) {
              return 'fa-solid fa-star';
            } else {
              return 'fa-regular fa-star';
            }
          };
        
          return (
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((index) => (
                <i key={index} className={getStarClass(index)}></i>
              ))}
            </div>
          );
    };

    return (
      <>
        <Star calificación={calificacion} />
      </>
    )
}