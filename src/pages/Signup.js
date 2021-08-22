import { Component } from 'react';

class Signup extends Component{
  render() {
    return (
      <div className="col-md-6 m-auto">
        <h2 className="text-center">Manage your tasks with Notee now!</h2>
        <form>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="username" name="username" className="form-control" id="username" aria-describedby="username" placeholder="Username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" className="form-control" id="password" placeholder="Password" />
          </div>
          <div className="form-group">
            <label htmlFor="confirmpassword">Re-enter your Password</label>
            <input type="password" name="password2" className="form-control" id="confirmpassword" placeholder="Password again" />
          </div>
          <div className="form-check">
            <input type="checkbox" name="checkbox" className="form-check-input" id="remember" />
            <label className="form-check-label" htmlFor="remember">
              I accept terms and conditions
            </label>
          </div>
          <button type="submit" className="btn btn-primary float-right">
            Register
          </button>
        </form>
      </div>
    );
  }
}
export default Signup;
