import React from 'react';
import './barMenu.style.css'

export const BarMenu = () => {

    return (
      <>
        <div className='art-menu'>
            <h1> Productos </h1>
            <div>
              <button>
                <img src="img/icon/orden-grid.svg" />
              </button>
              <button>
                <img src="img/icon/orden-list.svg" />
              </button>
            </div>
        </div>
      </>
    )
}