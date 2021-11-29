import React, {useState} from 'react';
import Nav from './nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashAlt, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
const axios = require('axios');

const Menu = () => {

    /* *************** show products by type   *********************** */
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

    /* *************** capturing customer name   *********************** */
    const [client, setClient] = useState('');

    const inputName = (event) => {
        setClient({
            [event.target.name] : event.target.value
        });
        console.log(client);
    }

    const [productsCard, setProductsCard] = useState([]); 
    const [total, setTotal] = useState(0);

  
    const showProductsCard = (product, price) => {        
        setProductsCard([
            ...productsCard,
            product
        ]);
        setTotal(total + price);
    };

    const deletePedido = (idP, price) => {
        const newData = productsCard.filter((product) => product._id !== idP);
        setProductsCard(newData);
        setTotal(total - price);
    };

    const [productsOrder, setProductsOrder] = useState('');


    const probando = () => {
        const pro =   productsCard.map((i) => (i._id));
        console.log(pro);
        pro.forEach((index) => 
        setProductsOrder([
            ...productsOrder,
                        {
                            qty: 1,
                            product: index,
                        }

        ]))     
        
        console.log(productsOrder);
    }


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
               { products.map((item, index) => (<button onClick={() => showProductsCard(item, item.price)} className="btnListMenu" key={index} >
               {item.name}   S/{item.price}</button>))} 
            </section>  
          </section>
          <section className = "containerPedidos">
             <p className = "lblPedido">PEDIDO</p> <br />
             <input className="inputNameClient" placeholder="Name Client" onChange={inputName} name="client"></input> 
             <section className = "sctPedidos">
                 {productsCard.map((item, index) => (
                     <><label className="lblProduct" key={index}>{item.name}</label> 
                     <FontAwesomeIcon className= 'faMinus' icon ={faMinus} />
                     <label key={index +2}>1</label>
                     <FontAwesomeIcon className= 'faPlus' icon ={faPlus} />
                     <label className="lblPrice" key={index +1}>S/. {item.price}</label>
                     <button className="btnTrash" onClick={() => deletePedido(item._id, item.price)}><FontAwesomeIcon className= 'fontTrash' icon ={faTrashAlt} /></button><br /></> 
                 ))}
             </section>
             <div className='dvTotal'>
             <label className="lblTotal">TOTAL</label><label className="lblNumberTotal">S/. {total}</label>
             <div className="dvBtnSendOrder">
             <button className="btnSend" onClick={probando}>SEND</button>
             </div>
             </div>
             
             
          </section>
        </section></>
    )
};

export default Menu;