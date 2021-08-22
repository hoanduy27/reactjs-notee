import { Component } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

class Logout extends Component{
  render() {
    localStorage.removeItem("username");
    localStorage.removeItem("name");
    return <Redirect to="/"/> ;
  }
}
export default Logout;
