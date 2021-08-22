import { Component } from 'react';
import callApi from '../api/api';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      password: '',
      password2: '',
      matchPassword: true,
      validUsername: false,
      validName: false,
      validPassword: false
    }
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });

    const isBlank = value === "";
    const hasSpace = value.search(" ") > -1;

    if(name === "username"){
      this.setState({
        validUsername: !hasSpace && !isBlank
      })
    }
    else if(name === "name"){
      this.setState({
        validName: !isBlank
      })
    }
    
    else if(name === "password"){
      this.setState({
        validPassword: !hasSpace && !isBlank,
        matchPassword: value === this.state.password2
      })
    }

    else if(name === "password2"){
      this.setState({
        matchPassword: value === this.state.password
      })
    }
  }
  onSubmitSignup = (event) => {
    event.preventDefault();
    if(this.state.validUsername && this.state.validPassword && this.state.validName && this.state.matchPassword){
      const data={
        username: this.state.username,
        name: this.state.name,
        password: this.state.password
      }
      callApi("register", "POST", data).then(item => {
        try {
          if(item.data.success === 0){
            alert("Success!");
            window.location.replace("/login");
          }
          else if(item.data.success === 1){
            alert("This username has been used. Please use another username.")
          }
        } catch (err) {
          console.error(err.message)
        }
      });
    }
    else{
      alert("Please check your input before submitting.")
    }
    
  }

  render() {


    return (
      <div className="col-md-6 m-auto">
        <h2 className="text-center">Manage your tasks with Notee now!</h2>
        <form onSubmit={this.onSubmitSignup}>
          <div className="form-group">
            <div className="row">
              <label className="col" htmlFor="username">Username</label>
              <div className="text-danger text-right col" hidden={this.state.validUsername}>Invalid username</div>
            </div>
            <input type="username" name="username" className="form-control" id="username" aria-describedby="username" placeholder="No space, not blank"  maxLength="10" value={this.state.username} onChange={this.onChange} />
          </div>
          <div className="form-group">
            <div className="row">
              <label className="col" htmlFor="name">Name</label>
              <div className="text-danger text-right col" hidden={this.state.validName} maxLength="30">Invalid name</div>
            </div>
            <input type="name" name="name" className="form-control" id="name" aria-describedby="name" placeholder="Name" value={this.state.name} onChange={this.onChange} />
          </div>
          <div className="form-group">
            <div className="row">
              <label htmlFor="password" className="col">Password</label>
              <div className="text-danger text-right col" hidden={this.state.validPassword}>Invalid password</div>
            </div>
            <input type="password" name="password" className="form-control" id="password" placeholder="Password" value={this.state.password} onChange={this.onChange} />
          </div>
          <div className="form-group">
            <label htmlFor="confirmpassword">Re-enter your Password</label>
            <input type="password" name="password2" className="form-control" id="confirmpassword" placeholder="Password again" value={this.state.password2} onChange={this.onChange} />
            <div className="text-danger" hidden={this.state.matchPassword}>Password does not match!</div>
          </div>
          <button type="button" className="btn btn-primary float-right" onClick={this.onSubmitSignup}>
            Register
          </button>
        </form>
      </div>
    );
  }
}
export default Signup;
