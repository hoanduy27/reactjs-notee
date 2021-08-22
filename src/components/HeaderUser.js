import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class HeaderUser extends Component {
    render() {
        
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to="/">
                    Notee
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <NavLink  to="/home" className="nav-link">
                                Home
                            </NavLink>
                        </li>
                    </ul>
                    <p className="my-2 my-sm-0">Hello <span className="text-primary">{localStorage.getItem("name")}</span></p>
                    <NavLink to="/logout" className="btn btn-outline-info my-2 my-sm-0 ml-3" >
                        Logout
                    </NavLink>
                </div>
            </nav>
        );
    }
}
export default HeaderUser;
