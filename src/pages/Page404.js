
import { Component } from 'react';

class Page404 extends Component {
    render() {
        return (
            <div className="col-md-8 m-auto text-center">
                <h1 className="text-center">
                    OOPS!
                </h1>
                <p>
                    This page doesn't exist or you don't have permission to access this page.
                </p>
                <a href="/" type="button" className="btn btn-primary text-center">
                    Back to main page
                </a>
            </div>
        )
    }
}
export default Page404;
