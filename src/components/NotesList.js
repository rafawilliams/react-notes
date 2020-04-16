import React, { Component } from 'react'
import axios from 'axios';
import { format} from 'timeago.js';
import toastr from "toastr";
import "toastr/build/toastr.min.css";
import {Link} from "react-router-dom";

export default class NotesList extends Component {

    state = {
        notes:[]
    };

    async getNotes(){
        const response = await axios.get('http://localhost:4000/api/notes');
        this.setState({
            notes: response.data
        }); 
    }
    async componentDidMount(){
        this.getNotes();
    }

    deleteNote = async (id) =>{
       const res = await axios.delete(`http://localhost:4000/api/notes/${id}`);

       toastr.success(res.data.message, 'Note', {timeOut: 1000})
       this.getNotes();
    }

    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note => (
                        <div className="col-lg-4 p-2" key={note._id}>
                            <div className="card">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{note.title}</h5>
                                    
                                    <Link to={`/edit/${note._id}`} className="btn btn-secondary">Edit</Link>
                                </div>
                                <div className="card-body">
                                    <p>{note.description}</p>
                                    <p>{note.autor}</p>
                                    <small>{format(note.date)}</small>
                                </div>
                                <div className="card-footer">
                                    <button type="button" className="btn btn-danger" onClick={() =>this.deleteNote(note._id)}>delete</button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
