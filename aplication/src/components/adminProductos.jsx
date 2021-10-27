import React, {useEffect,useState} from 'react';
import axios from 'axios';
import Nav from './nav';
import {Table} from 'reactstrap' 
import {makeStyles} from '@material-ui/core/styles'
import {Modal, Button} from '@material-ui/core'

const usesStyle = makeStyles((theme) => ({
    modal:{
        justifyContent: 'center',
        position: 'absolute',
        width: 300,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #F37328',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
        top:'50%',
        left:'50%',
        transform: 'translate(-50%, -50%)'
    },
    imputMateria:{
        width:'90%',
        margin: '3px'
        
    }
}));

const AdminProducts = () => {

    const styles = usesStyle();  
    const [modalUpdate, setmodalUpdate] = useState(false);
    const [modalDelete, setmodalDelete] = useState(false);
    const [data, setData] =useState([]);
    const [dataProduct, setdataProduct] =useState({
        name:'',
        price: '',
        image:'',
        type: ''
    });

    const [dataProductUpdate, setdataProductUpdate] =useState({
        name:'',
        price: '',
        image:'',
        type: ''
    });

    const [id, setId] =useState({
        id:''
    });
    // const [idUp, setidUp] =useState({
    //     id:''
    //   });

    const [dataCapturada, setdataCapturada] = useState({
      id:'',
      name:'',
      price:'',
      image:'',
      type: ''
    });

      const handleChangeUpdate = (e) => {
        const {name, value} = e.target;
        setdataProductUpdate((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setdataProduct((prevState) => ({
            ...prevState,
            [name]: value
        }));
   };

   const createProduct = (e) =>{
    e.preventDefault();
    const URL = 'https://apiburgerqueen-bkom.herokuapp.com/products';
    const token = localStorage.getItem('token');
    console.log(dataProduct);
    axios.post(URL, dataProduct , { headers: {"Authorization" : `Bearer ${token}`} })
      .then(res => {
        console.log(res.data);
        allProducts();
      }).catch(erro => console.log(erro)); 
  };

    const allProducts = () =>{
        const URL = 'https://apiburgerqueen-bkom.herokuapp.com/products';
        const token = localStorage.getItem('token');
        axios.get(URL, { headers: {"Authorization" : `Bearer ${token}`} })
        .then(res => {setData(res.data)});
      };

      const openCloseModalDelete = (id) => {
        setId(id);
        setmodalDelete(!modalDelete);   
        
      };

      const deleteProducts = () => {
        // console.log(id)
        const URL = 'https://apiburgerqueen-bkom.herokuapp.com/products';
        const token = localStorage.getItem('token');
        axios.delete(`${URL}/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
          .then(res => {
            console.log(res.data);
            allProducts();
          }).catch(erro => console.log(erro)); 
          setmodalDelete(false);
      };

      const openCloseModalUddate = (idUpdate, name, price, image, type) => {
        // setidUp(idUpdate);
        setdataCapturada({
          id: idUpdate,
          name: name,
          price: price,
          image: image,
          type: type
        });
        setmodalUpdate(!modalUpdate);
      };

      const editProduct = () =>{
        const URL = 'https://apiburgerqueen-bkom.herokuapp.com/products';
        const token = localStorage.getItem('token');
        console.log(dataCapturada.id, dataProductUpdate);
        axios.put(`${URL}/${dataCapturada.id}`, dataProductUpdate , { headers: {"Authorization" : `Bearer ${token}`} })
          .then(res => {
            console.log(res.data);
            allProducts();
          }).catch(erro => console.log(erro)); 
          setmodalUpdate(false);
      };

      useEffect( () => {        
        allProducts();
      },[])
    return (       
        <><Nav />
        <section className = "containerToolProducts">   
            <section className="seccionFormCreateProducts">
              <form className="formCreateProducts">
               <input className="inputCreateProduct" placeholder="Name Product" name="name" onChange={handleChange}></input>
               <input type="number" className="inputCreateProduct" placeholder="Price" name="price" onChange={handleChange}></input>
               <input className="inputCreateProduct" alt="imagen" onChange={handleChange} name ='image' placeholder="upload Image"/>
               <select onChange={handleChange} defaultValue={'DEFAULT'} name="type" className="selectType">
                <option value="DEFAULT" disabled>Choose type ...</option>
                <option name="type">desayuno</option>
                <option  name="type">hamburguesas</option>
                <option  name="type">bebidas</option>
                </select>
               <button className="btnCreateProduct" onClick={createProduct}>ADD</button>
               <button className="btnCancelProduct">CANCEL</button>                
              </form>
            </section>         

             <section name="data" className = "containerAllProducts">
               <section className="sectionSearchProduct">
               <input className="formInputSearchProduct" placeholder="Search User"></input>
               </section>
              <section name="data" className = "containertableAllProducts">
              <Table className='tableProducts'>
                    <thead>
                      <tr><th className="thID" scope="col">ID</th>
                      <th className="thName" scope="col">NAME</th>
                      <th className="thPrice" scope="col">PRICE</th>
                      <th className="thType" scope="col">TYPE</th>
                      <th className="thImg" scope="col">IMAGE</th>                      
                      <th className="thOptions" scope="col">OPTIONS</th></tr>          
                    </thead>
                    <tbody>                        
                    { data.map((product, index) => (
                        <tr key={index}>
                          <td>{product._id}</td>
                          <td>{product.name}</td>
                          <td>{product.price}</td>
                          <td>{product.type}</td>
                          <td> <img src={product.image} alt="imagen" width="25px" height="25px"/></td>
                          {/* <td>{product.image}</td> */}
                          <td><button className="btntable btnEditar" onClick={() => openCloseModalUddate(product._id, product.name, product.price, product.image, product.type)}>EDIT</button>
                          <button className="btntable btnDelete" onClick={() => openCloseModalDelete(product._id)}>DELETE</button></td></tr>                         
                      )                  
                    )}                        
                    </tbody>
                </Table> 
              </section>
                              
            </section>    
        </section>
        
        <Modal open={modalDelete} onClose={openCloseModalDelete}>
        <div className= {styles.modal}> 
          <p>Desea eliminar el usuario</p>        
        <Button onClick={deleteProducts}>SI</Button>
        <Button onClick={openCloseModalDelete}>NO</Button>
        </div>
        </Modal>

        <Modal open={modalUpdate} onClose={openCloseModalUddate}>
        <div className= {styles.modal}> 
        <input className={styles.imputMateria} onChange={handleChangeUpdate} name='name' defaultValue={dataCapturada.name}></input>
        <input className={styles.imputMateria} onChange={handleChangeUpdate} name='price' defaultValue={dataCapturada.price}></input>
        <input className={styles.imputMateria} onChange={handleChangeUpdate} name='image' defaultValue={dataCapturada.image}></input>
        <select onChange={handleChangeUpdate} name="type" className="selectType" defaultValue={dataCapturada.type}>
            <option name="type">desayuno</option>
            <option  name="type">hamburguesas</option>
            <option  name="type">bebidas</option>
        </select>       
        <Button onClick={editProduct}>UPDATE</Button>
        <Button onClick={openCloseModalUddate}>CANCEL</Button>
        </div>
        </Modal>
        </>  

        
  )

}

export default AdminProducts;

