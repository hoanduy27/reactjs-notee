import { Component } from 'react';
import { Modal } from 'react-bootstrap';
import { IoIosTrash, IoMdCreate } from 'react-icons/io';
import { Label } from 'reactstrap';
import callApi from '../api/api';

class Task extends Component {
    constructor(props) {
        super(props);
        this.taskProgress = {
            0: "Pending", 1: "In progress", 2: "Done!"
        }
        this.taskHighlight = {
            0: "primary", 1:"warning", 2: "success"
        }
        this.state = {
            taskName: this.props.taskName,
            taskDescription: this.props.taskDescription,
            taskStatus: this.props.taskStatus
        }
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }
    onToggleEditTask = () => {
        this.setState({ modal_show: !this.state.modal_show });
    }

    onSubmitEditTask = (event) => {
        event.preventDefault();
        const taskName = this.state.taskName;
        const taskDescription = this.state.taskDescription;
        const status = this.state.taskStatus;
        if(taskName && taskDescription && status in [0,1,2]){
            const data = {
                tid: this.props.taskID,
                tname: taskName,
                description: taskDescription,
                status: status
            }
            callApi("edit_task", "POST", data);
            window.location.reload();
        }
        else if(!taskName || !taskDescription){
            alert("<Task name> and <Task description> must not be empty");
        }
        else{
            alert("Invalid <Task status>");
        }
    }
    onRemoveTask = () => {
        if (window.confirm(`Are you sure to remove this task: ${this.props.taskName}`)) {
            const data = { tid: this.props.taskID };
            callApi("remove_task", "POST", data);
            window.location.reload();
        }
    }
    render() {
        const { taskID, taskOrder, taskName, taskDescription, taskStatus } = this.props;
        return (
            <>
                <Modal show={this.state.modal_show} onHide={this.onToggleEditTask}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit task: <span className="text-primary">{taskName}</span></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="form-add-category" onSubmit={this.onSubmitEditTask}>
                            <Label for="taskName">Task name:</Label>
                            <input type="text" name="taskName" className="form-control mb-2 mr-sm-2" placeholder="Task name" value={this.state.taskName} onChange={this.onChange} />
                            <Label for="taskDescription">Task description:</Label>
                            <textarea className="form-control" name="taskDescription" rows="3" onChange={this.onChange} placeholder="Description">{this.state.taskDescription}</textarea>
                            <Label for="taskStatus">Task status:</Label>
                            <select className="form-control" name="taskStatus" value={this.state.taskStatus} onChange={this.onChange}>
                                <option value="0">{this.taskProgress[0]}</option>
                                <option value="1">{this.taskProgress[1]}</option>
                                <option value="2">{this.taskProgress[2]}</option>
                            </select>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={this.onToggleEditTask}>Close</button>
                        <button type="button" className="btn btn-primary" onClick={this.onSubmitEditTask}>Save changes</button>
                    </Modal.Footer>
                </Modal>


                <tr>
                    <th className="text-center" scope="row">{taskOrder}</th>
                    <td>{taskName}</td>
                    <td>
                        {taskDescription}
                    </td>
                    <td className={`text-center text-${this.taskHighlight[taskStatus]}`}>
                        {this.taskProgress[taskStatus]}
                    </td>
                    <td className="text-center">
                        <IoMdCreate className="text-primary" onClick={this.onToggleEditTask} />
                        <IoIosTrash className="ml-2 text-danger" onClick={this.onRemoveTask} />
                    </td>
                </tr>
            </>
        );
    }
}
export default Task;
