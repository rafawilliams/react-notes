import React, { Component } from 'react';
import axios from 'axios';
import toastr from "toastr";
import "toastr/build/toastr.min.css";

export default class CreateUser extends Component {

   state = {
       users:[],
       username:''
   }

   async getUsers(){

      const response = await axios.get('http://localhost:4000/api/users');
      this.setState({
        users: response.data
      }); 
   }

   componentDidMount(){
      this.getUsers();
    }

    onChangeUserName = (e) =>{
        this.setState({
            username: e.target.value
        })
    }

    deleteUser = async (id) =>{
        
       const res = await axios.delete(`http://localhost:4000/api/users/${id}`);
       this.getUsers();

       toastr.success(res.data.message, 'User', {timeOut: 2000})
    }

    sendForm = async (e) =>{
        e.preventDefault();
        const res = await axios.post('http://localhost:4000/api/users',{username: this.state.username});
        this.getUsers();
        
        toastr.success(res.data.message, 'User', {timeOut: 2000});

        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div className="row g-4">
                <div className="col-md-5"> 
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-header bg-white border-0 pt-4 pb-0">
                            <h4 className="fw-bold"><i className="bi bi-person-plus text-primary me-2"></i>Create New User</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.sendForm} className="mt-2">
                                <div className="form-group mb-4">
                                    <label className="form-label text-muted">Username</label>
                                    <div className="input-group">
                                        <span className="input-group-text bg-light border-0"><i className="bi bi-person"></i></span>
                                        <input type="text" 
                                            className="form-control border-0 bg-light" 
                                            placeholder="Enter username"
                                            value={this.state.username}
                                            onChange={this.onChangeUserName}
                                            required />
                                    </div>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-primary btn-lg">
                                        <i className="bi bi-save me-2"></i>Save User
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-7">
                    <div className="card h-100 border-0 shadow-sm">
                        <div className="card-header bg-white border-0 pt-4 pb-0">
                            <h4 className="fw-bold"><i className="bi bi-people text-primary me-2"></i>User List</h4>
                            <p className="text-muted small mb-0">Double-click a user to delete</p>
                        </div>
                        <div className="card-body">
                            {this.state.users.length === 0 ? (
                                <div className="text-center py-5 text-muted">
                                    <i className="bi bi-emoji-frown display-4 mb-3"></i>
                                    <p>No users found</p>
                                </div>
                            ) : (
                                <ul className="list-group list-group-flush">
                                    {
                                        this.state.users.map(user => (
                                            <li className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-3 border-bottom-0 rounded mb-2 bg-light" 
                                                key={user._id}
                                                onDoubleClick={() => this.deleteUser(user._id)}
                                                style={{ cursor: 'pointer', transition: 'all 0.2s' }}
                                                title="Double click to delete"
                                            >
                                                <span className="fw-medium">
                                                    <i className="bi bi-person-circle text-secondary me-3"></i>
                                                    {user.username}
                                                </span>
                                                <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill px-3 py-2">
                                                    <i className="bi bi-trash"></i>
                                                </span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
