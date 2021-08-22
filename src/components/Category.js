import callApi from '../api/api.js';
import { Component } from 'react';
import Task from './Task';
import { IoIosAddCircle, IoIosTrash } from 'react-icons/io';
import { Modal } from 'react-bootstrap';

class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            _tasks: [],
            modal_show: false,
            newTaskName: "",
            newTaskDesc: ""
        }
        this.categoryID = this.props.categoryID;
        this.categoryName = this.props.categoryName;
        
    }

    componentDidMount() {
        const username = localStorage.getItem("username")
        callApi(`${username}/categories/${this.categoryID}`, 'GET', null).then(item => {
            this.setState({
                loading: true,
                _tasks: item.data
            });
        });
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
          [name]: value
        });
    }
    onCloseAddTask = () => {
        this.setState({
            modal_show: false
        })
    }
    onShowAddTask = () => {
        this.setState({
            modal_show: true
        })
    }

    onSubmitAddTask = (event) => {
        event.preventDefault();
        const taskName = this.state.newTaskName;
        const description = this.state.newTaskDesc;
        if(!taskName || !description){
            alert("<Task name> and <Description> must not be empty!");
        }
        else{
            const data = {
                username: localStorage.getItem("username"),
                cid: this.categoryID,
                taskName: taskName,
                description: description
            };
            callApi('add_task', 'POST', data).then((item) => {
				if(item.data.success){
					window.location.reload();
				}
				else{
					alert("Add failed. Please try again.");
				}
			});
        }
        
    }

    onRemoveCategory = () => {
        if (window.confirm(`Are you sure want to remove this category: ${this.props.categoryName}`)) {
            const data = { cid: this.props.categoryID };
            callApi("remove_category", "POST", data);
            window.location.reload();
        }
    }


    render() {
        var accord = `c${this.categoryID}`
        var head = accord + "-head";
        var body = accord + "-body";

        const { loading, _tasks } = this.state;
        var showTasks =  _tasks.map((obj, index) => {
            return <Task
                key={obj.tid}
                taskID = {obj.tid}
                taskOrder={index + 1}
                taskName={obj.tname}
                taskDescription={obj.description}
                taskStatus={obj.status}
            />

        });

        
        if (!loading) {
            return <div>Loading...</div>
        }

        return (
            <>
                <Modal show={this.state.modal_show} onHide={this.onCloseAddTask}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new task for <span className="text-primary">{this.categoryName}</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="form-add-category" onSubmit={this.onSubmitAddTask}>
                            <label>Task name:</label>
                            <input type="text" name="newTaskName" className="form-control mb-2 mr-sm-2" placeholder="Task name" onChange={this.onChange} />
                            <label>Task description:</label>
                            <textarea className="form-control" name="newTaskDesc" rows="3" onChange={this.onChange} placeholder="Description"></textarea>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={this.onCloseAddTask}>Close</button>
						<button type="button" className="btn btn-primary" onClick={this.onSubmitAddTask}>Save changes</button>
                    </Modal.Footer>
                </Modal>

                <div id={accord} className="mb-3" role="tablist" aria-multiselectable="true">
                    <div className="card">
                        <div className="card-header" role="tab" id={head}>
                            <h5 className="mb-0 row">
                                <a className="col-md-9" data-toggle="collapse" data-parent={"#" + accord} href={"#" + body} aria-expanded="true" aria-controls={body}>
                                    {this.props.categoryName}
                                </a>
                                <button onClick={this.onShowAddTask} type="button" className="btn roundedCircle col-md-1">
                                    <IoIosAddCircle className="text-primary" />
                                </button>
                                <button onClick={this.onRemoveCategory} type="button" className="btn col-md-1">
                                    <IoIosTrash className="text-danger" />
                                </button>
                            </h5>
                        </div>
                        <div id={body} className="collapse in" role="tabpanel" aria-labelledby={head}>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="thead-light">
                                            <tr>
                                                <th className="text-center" scope="col">#</th>
                                                <th className="text-center" scope="col">Task name</th>
                                                <th className="text-center" scope="col">Description</th>
                                                <th className="text-center" scope="col">Status</th>
                                                <th className="text-center" scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {showTasks}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default Category;
