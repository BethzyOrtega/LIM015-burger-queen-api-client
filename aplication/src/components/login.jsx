import Logo from '../Imagenes/LogoHamburgesa.png';
import React , {useState} from 'react';
const axios = require('axios');

const Login = (props) => {   
    const [credenciales, setCredenciales] = useState({
        email: '',
        password: ''
    })

    const [messageError, setMsgError] = useState({
        error: false,
        errorMsg: ''
    });

    const inputCredencial = (e) => {
        setCredenciales({
            ...credenciales,
            [e.target.name] : e.target.value
        })
    };

    const btnlogin = (e) => {
        e.preventDefault();
        const URL = 'https://apiburgerqueen-bkom.herokuapp.com/auth';
         axios.post(URL, credenciales).then((res) => {
             if (res.request.status === 200){
                 localStorage.setItem('token', res.data.token);
                // console.log(res.data.token);
                props.history.push('/menu');
             }
         })
         .catch((res) => setMsgError({
            error: true,
            errorMsg: res.request.response
        }))

    }

    return (
        <><header className="containerLogoLogin">
            <img src={Logo} className="App-logo-Login" alt="logo" />
        </header> <br />
        <section className="sectionLogin">
            <h2> Welcome To Kathzy's Burger</h2>
            <form className="formLogin">
                 <input className="formInput" name="email" placeholder="Email Adress" onChange={inputCredencial}></input> <br />
                <input type="password" className="formInput" name="password" placeholder="Password" onChange={inputCredencial}></input><br />
                <button className="formButton" onClick={btnlogin}>LOGIN</button>
            </form>
            { messageError.error === true &&
             <section className="messageError" name="errorMsg">{messageError.errorMsg}</section>
            }
            
        </section></>
        
    )
}

export default Login;