import './App.css';
import Header from './components/Header';
import HeaderUser from './components/HeaderUser';
import Home from './pages/Home';
import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Logout from './pages/Logout';

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      loading: false,
      login: false,
      username: null
    }
  }
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route>
            <Route render={()=>{
              return localStorage.getItem("username") ? <HeaderUser/> : <Header/>
            }}/>
            <Switch>
              <Route exact path="/" component={Main}/>
              <Route path="/home" render={() => {
                return localStorage.getItem("username")? <Home/> : <Redirect to="/login"/>
              }}/>
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/logout" component={Logout}/>
            </Switch>
          </Route>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
