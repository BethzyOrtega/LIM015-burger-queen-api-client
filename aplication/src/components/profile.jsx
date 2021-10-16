import React from 'react';
import Logo from '../Imagenes/LogoHamburgesa.png';

const Profile = () => {
    return (
        <><header className="containerLogoLogin">
            <img src={Logo} className="App-logo-Login" alt="logo" />
        </header> <br />
        <section className="sectionLogin">
            <form className="formLogin">
                 <input className="formInput" name="email" placeholder="Email Adress"></input> <br />
                <input type="password" className="formInput" name="password" placeholder="Password"></input><br />
                <button className="btnProfileUp">UPDATE</button>
                <button className="btnProfileDelete">DELETE</button>
            </form>            
        </section>
        <button className="btnBack">BACK</button></>
    )
}

export default Profile;