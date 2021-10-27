import React from 'react';
import Nav from './nav';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUsers, faHamburger} from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
    return (        
            <><Nav />
            <section className="containerAdmin">
              <section className = "sectionbtnAdmin">        
               <button className="btn-Admin"><Link to = "/admin/users" className = "linkAdminUser"><FontAwesomeIcon id="faUsers" icon ={faUsers} />USERS</Link></button>
               <button className="btn-Admin"><Link to = "/admin/products" className = "linkAdminUser"><FontAwesomeIcon id="faHamburger" icon ={faHamburger} />PRODUCTS</Link></button>               
              </section>
            </section></>            
    )
}

export default Admin;