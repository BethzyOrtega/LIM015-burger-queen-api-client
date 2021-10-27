import React, {useState} from 'react';
import Nav from './nav';
const axios = require('axios');

const Menu = () => {
    const [products, setProducts] =useState([]);

    const allMenu= (e) => {
        e.preventDefault();
        const typeMenu = e.target.name;
        const URL = 'https://apiburgerqueen-bkom.herokuapp.com/products';
        const token = localStorage.getItem('token');
        const array = [];
        axios.get(URL, { headers: {"Authorization" : `Bearer ${token}`} })
       .then((res) => {
           res.data.forEach((product) => {
            if (product.type === typeMenu) array.push(product);      
           });
            setProducts(array);
        });
    };

    return (       
        <><Nav />
        <section className = "containerAllMenu">
          <section className = "sectionAllMenu">
            <section className = "sectionbtnMenu">        
              <button className="btnMenu" name="desayuno" onClick = {allMenu}>DESAYUNO</button>
              <button className="btnMenu" name="hamburguesas" onClick = {allMenu}>HAMBURGUESAS</button>
              <button className="btnMenu" name="bebidas" onClick = {allMenu}>BEBIDAS</button>
            </section>
            <section className = "menuDesplegable">
            { products.map((item, index) => (<button className="btnListMenu" key={index} >{item.name}   S/{item.price}</button>))} 
            </section>  
          </section>
          <section className = "containerPedidos">
             <p className = "lblPedido">PEDIDO</p> <br />
             <input className="inputNameClient"placeholder="Name Client"></input> 
          </section>
        </section></>
    )
}

export default Menu;