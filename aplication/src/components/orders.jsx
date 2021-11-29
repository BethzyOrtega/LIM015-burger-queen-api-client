import React, {useEffect,useState} from 'react';
import Nav from './nav';
import axios from 'axios';

const Orders = () => {
    const [data, setData] =useState([]);
    const [productID, setproductID] =useState([]);

    const allOrders = () =>{
        const URL = 'https://apiburgerqueen-bkom.herokuapp.com/orders';
        const token = localStorage.getItem('token');
        axios.get(URL, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {setData(res.data)});

        // console.log(data);
      };

    
      console.log(data);
      console.log(productID);
      useEffect( () => {        
        allOrders();
      },[])

      
    const dataPending = data.filter((item) => item.status === 'pending');
    const dataDelivering = data.filter((item) => item.status === 'delivering');
    const dataDelivered = data.filter((item) => item.status === 'delivered');
          
    

    return (
        <section>
            <Nav />
         <section className="containerOrders">
             <div className="columnPending">
                 <h1>Pending</h1>
                 {dataPending.map((order, index) => (
                     <><div> {order.client}</div>
                     <div>
                         {order.products.map(p => (
                             <><label>{p.product}</label><br />
                             <label>{p.qty}</label></>

                         ))}
                     </div></>

                 ))}
                 
             </div>
             <div className="columnDelivering">
               <h1>Delivering</h1>
             </div>
             <div className="columnDelivered">
                 <h1>Delivered</h1>
             </div>
         </section>
            
        </section>
    )
}

export default Orders;