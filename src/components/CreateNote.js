import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

export default class CreateNote extends Component {

    state = {
        
        users:[],
        title:'',
        description:'',
        username:'',
        startDate:new Date()
    }

    async getNote(id){
        const response = await axios.get(`http://localhost:4000/api/notes/${id}`);
        let datos = response.data;
        this.setState({
            title: datos.title,
            description: datos.description,
            username: datos.autor,
            date: new Date(datos.date)
        });
    }

    async componentDidMount(){
        const response = await axios.get('http://localhost:4000/api/users');
        this.setState({
            users: response.data
        }); 

        if(response.data.length === 0){

        }

        if(this.props.match.params.hasOwnProperty('id')){
            let id = this.props.match.params.id;
            this.getNote(id);
        }
    }

    selectUser = (e) => {

        this.setState({
            username: e.target.value
        })
        
    }

    onSubmitForm = async (e) => {
        e.preventDefault();

        let detalle = {
            autor: this.state.username,
            title: this.state.title,
            description: this.state.description,
            date: this.state.startDate
        };
        let res = {};
        if(!this.props.match.params.hasOwnProperty('id')){
          res = await axios.post('http://localhost:4000/api/notes',detalle);
        }

        if(this.props.match.params.hasOwnProperty('id')){
            let id = this.props.match.params.id;
            res = await axios.put(`http://localhost:4000/api/notes/${id}`,detalle);
        }
        toastr.success(res.data.message, 'Note', {timeOut: 1000})

        this.setState({
            username: '',
            title: '',
            description:'',
            startDate:new Date()
          }); 

          setTimeout(()=>{
            this.props.history.push('/');
          },1500)
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    selectedDate = date => {
        this.setState({
          startDate: date
        });
      };

    render() {
        return (
            <div className="col-md-6 col-lg-6 offset-md-3 offset-lg-3">
                <div className="card card-body">
                    <h3 className="">
                        Create note
                    </h3>

                    <form onSubmit={this.onSubmitForm}>
                    <div className="from-group">
                        <label>Username</label>
                        <select name="username" value={this.state.username} className="form-control" onChange={this.selectUser}>
                            {
                                this.state.users.map(user => (
                                <option value={user.username} key={user._id}>{user.username}</option>
                                ))
                            }
                        </select>
                    </div>
                        <div className="from-group">
                            <label>Title</label>
                            <input name="title" type="text" value={this.state.title}
                            className="form-control"
                            onChange={this.onInputChange}/>
                        </div>
                        <div className="from-group">
                            <label>Description</label>
                            <input name="description" type="text" className="form-control"
                            value={this.state.description} 
                            onChange={this.onInputChange}
                            required/>
                        </div>
                        <div className="from-group">
                            <label>Date</label>
                            <DatePicker className="form-control"
                                selected={this.state.startDate}
                                onChange={this.selectedDate}
                                required
                            />
                        </div>
                        <div className="form-group row">
                        <div className="col-lg-10">
                        <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
