import React from 'react';
import { Link } from "react-router-dom";
import Logo from '../Imagenes/LogoHamburgesa.png';

const Nav = () => {
    return (
        <section className = "container" >
      <header className = "containerLogo">   
        <img src={Logo} className="App-logo" alt="logo" />
      </header>
     <nav className = "navigation">
       <button id="btnProfile" className = "navButton"><Link to = "/profile" className = "linkButton">Profile</Link></button>
       <button className = "navButton" ><Link to = "/menu" className = "linkButton">Menu</Link></button>
       <button className = "navButton" ><Link to = "/admin" className = "linkButton">Admin</Link></button>
       <button className = "navButton"><Link to = "/orders" className = "linkButton">Orders</Link></button>
       <button className = "navButton"><Link to = "/login" className = "linkButton">LogOut</Link></button>
      </nav>
      </section>
    )
}

export default Nav;