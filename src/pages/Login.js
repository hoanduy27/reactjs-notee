import { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import callApi from '../api/api.js';

class Login extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
    }
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  onHandleChange(event){
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  }

  onHandleSubmit(event){
    event.preventDefault();
    //console.log(this.state);
    const {username, password} = this.state
    if(!username  || !password){
      alert("username and password must not be empty");
    }
    else{
      
      callApi("signin", "POST", {username: username, password: password}).then(item => {
        const {success, user} = item.data;
        if(success){
          localStorage.setItem("username", user.username);
          localStorage.setItem("name", user.name);
          window.location.replace("/home")
        }
        else{
          alert("Incorrect username or password!");
        }
      });
    }
  }
  render() {
    return localStorage.getItem("username") ? <Redirect to="/home"/> : (
      <div>
        <div className="col-md-6 m-auto">
          <h2 className="text-center">Welcome back!</h2>
          <form onSubmit={this.onHandleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" className="form-control" id="username" aria-describedby="usernameHelp" placeholder="Username" onChange={this.onHandleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" className="form-control" id="password" placeholder="Password" onChange={this.onHandleChange}/>
            </div>
            <button type="submit" className="btn btn-primary float-right">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default Login;
