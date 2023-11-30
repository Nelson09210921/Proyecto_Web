import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'
import { StateCompo } from './context/StateCompo.jsx'

import NavBar from './components/NavBar/NavBar.jsx';
import NavBarCarLog from './components/NavBarCarLog/NavBarCarLog.jsx';
import NavBarVer from './components/NavBarVer/NavBarVer.jsx';
import { Home } from './pages/Home.jsx';
import { Calidad } from './pages/Calidad.jsx';
import { Nosotros } from './pages/Nosotros.jsx';
import { Login } from './pages/Login.jsx';
import { Productos } from './pages/Productos.jsx';
import { NotFound } from './pages/404.jsx';

import { ProductosAdmin } from './pages/Admin/Productos/ProductosAdmin.jsx';
import { UsuariosAdmin } from './pages/Admin/Usuarios/UsuariosAdmin.jsx';

import { Detalles } from './pages/Detalles.jsx';
import { Carrito } from './pages/Carrito/Carrito.jsx';




/* import { PrivateRouter } from './router/PrivateRouter.jsx'; */

function App() {

  /* const navigate = useNavigate(); */

  const location = useLocation();
  const urlAct1 = location.pathname;
  const urlAct = urlAct1.replace('/', '');

  if (urlAct == '') {
    document.title = 'GAMETING';
  } else {
    document.title = urlAct;
  }

  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find((carr) => carr.prod_id === producto.prod_id);

    if (productoExistente) {

      console.log(carrito);
      const updatedCartItems = carrito.map((item) => {
        if (item.prod_id === producto.prod_id) {
          return {
            ...item,
            precio: item.precio + item.prod_precio_dcto,
            cantidad: item.cantidad + 1
          };
        }
        return item;
      });
      setCarrito(updatedCartItems);

    } else {

      const precioNew = producto.prod_precio_dcto !== null ? ((producto.prod_precio * producto.prod_precio_dcto) / 100) : producto.prod_precio;
      const nuevoProducto = {
        prod_id: producto.prod_id,
        prod_img: producto.prod_img,
        prod_nom: producto.prod_nom,
        prod_desc: producto.prod_desc,
        prod_precio: producto.prod_precio,
        prod_stock: producto.prod_stock,
        prod_precio_dcto: precioNew,
        precio: precioNew,
        cantidad: 1,
      };
      setCarrito([...carrito, nuevoProducto]);
    }

    /* setTotal(total + precio);
    
    setCarrito([...carrito, producto]); */
    console.log(carrito);
  };

  const bajarCantCarrito = (producto) => {
    const updatedCartItems = carrito.map((item) => {
      if (item.prod_id === producto.prod_id) {
        return {
          ...item,
          precio: item.precio - item.prod_precio_dcto,
          cantidad: item.cantidad - 1
        };
      }
      return item;
    });
    setCarrito(updatedCartItems);
  }

  const sumarCantCarrito = (producto) => {

    const updatedCartItems = carrito.map((item) => {
      if (item.prod_id === producto.prod_id) {
        return {
          ...item,
          precio: item.precio + item.prod_precio_dcto,
          cantidad: item.cantidad + 1
        };
      }
      return item;
    });
    setCarrito(updatedCartItems);
  }

  const delItemCarrito = (id) => {
    const updatedCart = carrito.filter((carr) => carr.prod_id !== id);
    setCarrito(updatedCart);
  }

  const vaciarCarrito = () => {
    setCarrito([]);
  }


  return (
    <>
      <div id="main">
        <StateCompo>
          <div className='contGener'>

            <NavBarVer />
            <div className='contRoot'>
              <NavBar />

              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/nosotros' element={<Nosotros />} />
                <Route path='/calidad' element={<Calidad />} />
                <Route path='/login' element={<Login />} />
                <Route path='/productos' element={<Productos agregarAlCarrito={agregarAlCarrito} />} />
                <Route path='/detalles/:id' element={<Detalles urlAct={urlAct} agregarAlCarrito={agregarAlCarrito} />} />
                <Route path='/carrito'
                  element={<Carrito
                    productos={carrito}
                    bajarCantCarrito={bajarCantCarrito}
                    sumarCantCarrito={sumarCantCarrito}
                    delItemCarrito={delItemCarrito}
                    vaciarCarrito={vaciarCarrito}
                  />} />

                <Route path='/prod_admin' element={<ProductosAdmin />} />
                <Route path='/user_admin' element={<UsuariosAdmin />} />
                {/* <Route path='/productos' element={
                  <PrivateRouter>
                    <Productos />
                  </PrivateRouter>
                } /> */}
                <Route path='*' element={<NotFound />} />
              </Routes>
            </div>

          </div>
        </StateCompo>
      </div>
    </>
  )
}


export default App
