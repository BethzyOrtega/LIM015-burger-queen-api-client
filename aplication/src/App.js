import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';
import Login from "./components/login";
import Menu from "./components/menu"
import Admin from './components/admin';
import Orders from './components/orders';
import Profile from './components/profile';
// import Nav from './components/nav';


function App() {
  return (
    <Router>
       {/* <Nav />       */}
      <Switch>
        <Route exact path="/" component = {Login} /> 
        <Route path="/menu" component= {Menu}/> 
        <Route path="/admin" component = {Admin} />
        <Route path="/orders" component = {Orders} />
        <Route path="/profile" component = {Profile} /> 
      </Switch>
    </Router>
  );
}

export default App;

/*
<header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */
