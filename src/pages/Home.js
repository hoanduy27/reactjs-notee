import callApi from "../api/api.js";
import Category from "../components/Category";
import { Component } from "react";
import { Modal } from "react-bootstrap";

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			_categories: [],
			modal_show: false,
			newCategoryName: ''
		};
	}

	onSubmitAddCategory = (event) => {
		event.preventDefault();
		const cname = this.state.newCategoryName;
		if(cname){
			const data = {
				username: localStorage.getItem("username"),
				cname: cname
			}
			callApi('add_category', 'POST', data).then((item) => {
				if(item.data.success){
					window.location.reload();
				}
				else{
					alert("Add failed. Please try again");
				}
			});
		}
		else{
			alert("Category name must not be empty!");
		}	
	}
	onToggleAddCategory = () => {
		this.setState({modal_show: !this.state.modal_show});
	}
	onChange = (event) => {
		var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
          [name]: value
        });
	}

	componentDidMount() {
		const username = localStorage.getItem("username");
		callApi(`${username}/categories`, "GET", null).then((item) => {
			console.log(item.data);
			this.setState({
				loading: true,
				_categories: item.data,
			});
		});
	}

	render() {
		const { loading, _categories } = this.state;
		var showCategories = _categories.map((obj, index) => {
			return (
				<Category key={obj.cid} categoryID={obj.cid} categoryName={obj.cname} />
			);
		});
		if (!loading) {
			return <div>Loading...</div>;
		}
		return (
			<div className="col-md-10 m-auto">
				<button
					type="button"
					className="btn btn-primary text-center m-3"
					onClick={this.onToggleAddCategory}
				>
					Add new Category
				</button>
				
				<Modal show={this.state.modal_show} onHide={this.onToggleAddCategory}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add new category</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="form-add-category" onSubmit={this.onSubmitAddCategory}>
							<label>Category name:</label>
                            <input type="text" name="newCategoryName" className="form-control mb-2 mr-sm-2" placeholder="Catogory name" onChange={this.onChange} />
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-secondary" onClick={this.onToggleAddCategory}>Close</button>
						<button type="button" className="btn btn-primary" onClick={this.onSubmitAddCategory}>Save changes</button>
                    </Modal.Footer>
                </Modal>
				{showCategories}
			</div>
		);
	}
}
export default Home;
