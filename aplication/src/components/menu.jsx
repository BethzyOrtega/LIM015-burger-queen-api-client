import React from 'react';
import Nav from './nav';

const Menu = () => {
    return (       
        <><Nav />
        <section className = "containerAllMenu">
          <section className = "sectionAllMenu">
            <button className="btnMenu">DESAYUNO</button>
            <button className="btnMenu">HAMBURGESAS</button>
            <button className="btnMenu">BEBIDAS</button>
          </section>
          <section className = "containerPedidos">
             <p className = "lblPedido">PEDIDO</p> <br />
             <input className="inputNameClient"placeholder="Name Client"></input> 
          </section>

        </section></>
    )
}

export default Menu;