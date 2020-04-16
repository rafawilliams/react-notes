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
            <div className="row">
                <div className="col-md-4"> 
                    <div className="card card-body">
                        <h3>Create new user</h3>
                        <form onSubmit={this.sendForm}>
                            <div className="from-group">
                                <input type="text" 
                                className="form-control" 
                                value={this.state.username}
                                onChange={this.onChangeUserName}/>
                            </div>
                            <div className="from-group">
                                <button type="submit" className="btn btn-primary">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                            this.state.users.map(user => (
                                <li className="list-group-item list-group-item-action" 
                                key={user._id}
                                onDoubleClick={() => this.deleteUser(user._id)}
                                >
                                    {user.username}
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
