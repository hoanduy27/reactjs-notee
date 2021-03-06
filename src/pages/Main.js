
import { Component } from 'react';

class Main extends Component {
    showButton() {
        if (localStorage.getItem("username")) {
            return (
                <a href="/home" type="button" className="btn btn-primary text-center">
                    Start managing your work
                </a>
            )
        }
        return (
            <div className="col justify-content-around">
                <a href="/login" type="button" className="btn btn-primary text-center m-3">
                    Login
                </a>
                <a href="/signup" type="button" className="btn btn-primary text-center m-3">
                    Sign up
                </a>
            </div>
        );
    }

    render() {
        return (
            <div className="col-md-8 m-auto">
                <h1 className="text-center">
                    Note it, note it good.
                </h1>
                <div className="text-center">
                    {this.showButton()}
                </div>
                <div className="main-introduction">
                    <h2>
                        What is it?
                    </h2>
                    <p>
                        Notee works like a to-do list that you can arrange your tasks into categories.
                    </p>
                </div>
                <div className="main-function">
                    <h2>
                        What can you do?
                    </h2>
                    
                    <ul>
                        <li>Create/Remove a category</li>
                        <li>Create/Remove a task</li>
                        <li>Edit your task: task name, task description, task progress</li>
                    </ul>
                    
                </div>
                <div className="main-start">
                    <h2>
                        How to start? (For testing)
                    </h2>
                    <p>
                        This is an application as a result of self-studying <span className="text-primary">Reactjs, Nodejs</span> and <span className="text-primary">PostgreSQL</span>.
                    </p>
                    <p>
                        You can click to <span className="text-primary">Sign up</span> to create a new user. You can also log in by <span className="text-success">duynguyen</span> (username: <b>duynguyen</b>, password: <b>duynguyen</b>) or <span className="text-success">noteen</span> (username: <b>noteen</b>, password: <b>noteen</b>) that I've created for testing.
                    </p>
                </div>


            </div>
        )
    }
}
export default Main;
