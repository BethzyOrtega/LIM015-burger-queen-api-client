import React from 'react';
import { Link } from "react-router-dom";
import Logo from '../Imagenes/LogoHamburgesa.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faIdBadge, faHome, faUsersCog, faUtensils} from '@fortawesome/free-solid-svg-icons';
import Logout from './logOut';

const Nav = () => {
  
    return (
        <section className = "container" >
      <header className = "containerLogo">   
        <img src={Logo} className="App-logo" alt="logo" />
      </header>
     <nav className = "navigation">
       <button id="btnProfile" className = "navButton"><Link to = "/profile" className = "linkButton"><FontAwesomeIcon icon ={faIdBadge} />Profile</Link></button>
       <button className = "navButton" ><Link to = "/menu" className = "linkButton"><FontAwesomeIcon icon ={faHome} />Menu</Link></button>
       <button className = "navButton" ><Link to = "/admin" className = "linkButton"><FontAwesomeIcon icon ={faUsersCog} />Admin</Link></button>
       <button className = "navButton"><Link to = "/orders" className = "linkButton"><FontAwesomeIcon icon ={faUtensils} />Orders</Link></button>
       <Logout />
      </nav>
      </section>
    )
}

export default Nav;