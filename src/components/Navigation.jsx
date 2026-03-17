import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Navigation extends Component {
    
    render() {
       
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
                <div className="container">
                    <Link className="navbar-brand fw-bold text-primary" to="/">
                        <i className="bi bi-journal-text me-2"></i>NoteApp
                    </Link>
                    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto gap-2">
                            <li className="nav-item">
                                <Link className="nav-link px-3" to="/">Notes</Link>
                            </li>
                            <li className="nav-item"> 
                                <Link className="nav-link px-3" to="/create">Create Note</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link px-3" to="/user">Create User</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> 
        )
    };
}
