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
        if (this.state.notes.length === 0) {
            return (
                <div className="text-center py-5 text-muted">
                    <i className="bi bi-journal-x display-1 mb-3"></i>
                    <h4>No notes yet</h4>
                    <p>Create your first note to get started!</p>
                    <Link to="/create" className="btn btn-primary mt-2">Create Note</Link>
                </div>
            )
        }

        return (
            <div className="row g-4">
                {
                    this.state.notes.map(note => (
                        <div className="col-md-6 col-lg-4" key={note._id}>
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-header bg-white border-0 pt-4 pb-0 d-flex justify-content-between align-items-start">
                                    <h5 className="mb-0 fw-bold text-dark text-truncate pe-2">{note.title}</h5>
                                    <div className="dropdown">
                                        <button className="btn btn-light btn-sm rounded-circle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <i className="bi bi-three-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu dropdown-menu-end shadow-sm border-0">
                                            <li><Link to={`/edit/${note._id}`} className="dropdown-item"><i className="bi bi-pencil me-2 text-primary"></i>Edit</Link></li>
                                            <li><hr className="dropdown-divider" /></li>
                                            <li><button className="dropdown-item text-danger" onClick={() => this.deleteNote(note._id)}><i className="bi bi-trash me-2"></i>Delete</button></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p className="card-text text-secondary">{note.description}</p>
                                </div>
                                <div className="card-footer bg-white border-0 pb-4 pt-0 d-flex justify-content-between align-items-center text-muted small">
                                    <span className="d-flex align-items-center">
                                        <i className="bi bi-person-circle me-1"></i> {note.autor}
                                    </span>
                                    <span className="d-flex align-items-center">
                                        <i className="bi bi-clock me-1"></i> {format(note.date)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}
