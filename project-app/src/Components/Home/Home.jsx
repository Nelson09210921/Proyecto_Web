import React, {useState} from 'react'
import './home.css'
import fondoprincipal from '../../Assets/fondoprincipal.mp4'
import {AiFillLock} from 'react-icons/ai'
import {IoMdMail} from 'react-icons/io'
import {IoIosCloseCircle} from 'react-icons/io'
import videofondohome2 from '../../Assets/videofondohome2.mp4'


const Home = () => {
  
  const [active, setActive] = useState('wrapper')
  const showWrp =()=>{
    setActive('wrapper activeWrapper')
  }
  const hideWrp =()=>{
    setActive('wrapper')
  }


  return (
    <section className='home' >
      <div className='overlay' ></div>
      <video src={fondoprincipal} muted autoPlay loop type="video/mp4" ></video>

      <div className="homeContent container" >
        
        <div className="textDiv" >

          <span className="smallText">
            Ultimos lanzamientos
          </span>
           
          <h1 className="homeTitle">
            Busca tu preferido
          </h1>


        </div>


        <div onClick={showWrp} className="showwrp">
        <button className='btnhome' >
          Log in
        </button>
          </div>
          <div className="showwrp">
        <button className='btnhome' >
          Sing up
        </button>
          </div>

        <div className={active}>

          <div className="form-box login">

            <h2>Login</h2>

            <form action='#'>

            <div className="input-box">

              <IoMdMail className="icon"/>

                <input type='text' required></input>

              <label>Email</label>
            </div>
              <div className="input-box">

                <AiFillLock className="icon"/>

                <input type='password' required></input>

                <label>Password</label>
              </div>
              <div className="remember-forgot">
                <label>
                  <input type='checkbox'></input>Remember me
                </label>
                <a>Forgot Password?</a>
              </div>
              <button type='submit' className='btn'>Login
              </button>
              <div className="login-register">
                <p>Don't have an account?<a href="#" className='register-link'>Register</a></p>
              </div>
              <div onClick={hideWrp} className="hidewrp">
            <IoIosCloseCircle className="icon"/>
             </div>
            </form>
          </div>
        </div>
      
      </div>


    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    </section>
  )
}

export default Home