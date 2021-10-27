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

const AdminUsers = () => {
    const styles = usesStyle();
    const [modalUpdate, setmodalUpdate] = useState(false);
    const [modalDelete, setmodalDelete] = useState(false);
    const [data, setData] =useState([]);
    const [dataUsuario, setdataUsuario] =useState({
        email:'',
        password:'',
        roles:''
    });

    const [dataUsuarioUpdate, setdataUsuarioUpdate] =useState({
      email:'',
      password:'',
      roles:[]
  });

  const [id, setId] =useState({
      id:''
  });
  

const [dataCapturada, setdataCapturada] = useState({
  id:'',
  email:'',
  roles:''
});

     const handleChange = (e) => {
       const {name, value} = e.target;
       setdataUsuario((prevState) => ({
           ...prevState,
           [name]: value
       }))
       
  };

  const handleChangeUpdate = (e) => {
    const {name, value} = e.target;
    setdataUsuarioUpdate((prevState) => ({
        ...prevState,
        [name]: value
    }));
};

  const allUsers = () =>{
    const URL = 'https://apiburgerqueen-bkom.herokuapp.com/users';
    const token = localStorage.getItem('token');
    axios.get(URL, { headers: {"Authorization" : `Bearer ${token}`} })
    .then(res => { setData(res.data)})
  };

  const createUser = (e) =>{
    e.preventDefault();
    const URL = 'https://apiburgerqueen-bkom.herokuapp.com/users';
    const token = localStorage.getItem('token');
    console.log(dataUsuario);
    axios.post(URL, dataUsuario , { headers: {"Authorization" : `Bearer ${token}`} })
      .then(res => {
        console.log(res.data);
        allUsers();
      }).catch(erro => console.log(erro)); 
  };

  const openCloseModalUddate = (idUpdate, emailUpdate, rolesUpdate) => {
    setdataCapturada({
      id: idUpdate,
     email: emailUpdate,
      roles: rolesUpdate
    })
    setmodalUpdate(!modalUpdate);
  };

  const editUSer = () =>{
    const URL = 'https://apiburgerqueen-bkom.herokuapp.com/users';
    const token = localStorage.getItem('token');
    console.log(dataCapturada.id, dataUsuarioUpdate);
    axios.put(`${URL}/${dataCapturada.id}`, dataUsuarioUpdate , { headers: {"Authorization" : `Bearer ${token}`} })
      .then(res => {
        console.log(res.data);
        allUsers();
      }).catch(erro => console.log(erro)); 
      setmodalUpdate(false);
  };

  const openCloseModalDelete = (id) => {
    setId(id);
    setmodalDelete(!modalDelete);   
    
  };

  const deleteUser = () => {
    // console.log(id)
    const URL = 'https://apiburgerqueen-bkom.herokuapp.com/users';
    const token = localStorage.getItem('token');
    axios.delete(`${URL}/${id}`, { headers: {"Authorization" : `Bearer ${token}`} })
      .then(res => {
        console.log(res.data);
        allUsers();
      }).catch(erro => console.log(erro)); 
      setmodalDelete(false);
  };
 
    useEffect( () => {        
      allUsers();
    },[])

    return (       
        <><Nav />
        <section className = "containerToolUsers">         
             <form className="formCreateUSer">
                <input className="formInputUer" name="email" placeholder="Email Adress" onChange={handleChange}></input>
                <input type="password" className="formInputUer" name="password" placeholder="Password" onChange={handleChange}></input>
                <select onChange={handleChange} defaultValue={'DEFAULT'} name="roles" className="selectRol">
                <option value="DEFAULT" disabled>Choose rol ...</option>
                <option name="roles">admin</option>
                <option  name="roles">user</option>
                </select>
                <button className="btnCreateUser" onClick={createUser}>CREATE</button>
            </form>
            <section className = "containerFindUser">
            <input className="formInputSearchUser" placeholder="Search User"></input> <br />
            </section>
            <section name="data" className = "containertableAllUsers">
                <Table >
                    <thead>
                      <tr><th scope="col">ID</th>
                      <th scope="col">EMAIL</th>
                      <th scope="col">ROLES</th>
                      <th scope="col">OPCIONES</th></tr>          
                    </thead>
                    <tbody>                        
                    { data.map((user, index) => (
                        <tr key={index}>
                          <td>{user._id}</td>
                          <td>{user.email}</td>
                          <td>{user.roles}</td>
                          <td><button className="btntable btnEditar" onClick={() => openCloseModalUddate(user._id, user.email, user.roles)}>EDITAR</button>
                          <button className="btntable btnDelete" onClick={() => openCloseModalDelete(user._id)}>BORRAR</button></td></tr>                         
                      )                  
                    )}                        
                    </tbody>
                </Table>                
            </section>    
        </section>
        <Modal open={modalUpdate} onClose={openCloseModalUddate}>
        <div className= {styles.modal}> 
        <input className={styles.imputMateria} onChange={handleChangeUpdate} defaultValue={dataCapturada.email} name='email'></input>
        <input type="password" className={styles.imputMateria} onChange={handleChangeUpdate} name='password'></input>
        <select className={styles.imputMateria} onChange={handleChangeUpdate} defaultValue={dataCapturada.roles} name="roles">
          {/* <option value="DEFAULT" disabled>Choose rol ...</option> */}
          <option name="roles" value = "615a8743885c87661279f135">admin</option>
          <option name="roles" value = "615a8743885c87661279f133">user</option>
          </select>
        <Button onClick={editUSer}>UPDATE</Button>
        <Button onClick={openCloseModalUddate}>CANCEL</Button>
        </div>
        </Modal>

        <Modal open={modalDelete} onClose={openCloseModalDelete}>
        <div className= {styles.modal}> 
          <p>Desea eliminar el usuario</p>        
        <Button onClick={deleteUser}>SI</Button>
        <Button onClick={openCloseModalDelete}>NO</Button>
        </div>
        </Modal>
        </>  
  )

}

export default AdminUsers;


