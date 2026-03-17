import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toastr from "toastr";
import "toastr/build/toastr.min.css";

export default function CreateNote() {
    const [users, setUsers] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [username, setUsername] = useState('');
    const [startDate, setStartDate] = useState(new Date());

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:4000/api/users');
            setUsers(response.data);
            if (response.data.length > 0) {
                setUsername(response.data[0].username);
            }

            if (id) {
                const noteRes = await axios.get(`http://localhost:4000/api/notes/${id}`);
                const datos = noteRes.data;
                setTitle(datos.title);
                setDescription(datos.description);
                setUsername(datos.autor);
                setStartDate(new Date(datos.date));
            }
        };
        fetchData();
    }, [id]);

    const selectUser = (e) => {
        setUsername(e.target.value);
    }

    const onSubmitForm = async (e) => {
        e.preventDefault();

        const detalle = {
            autor: username,
            title: title,
            description: description,
            date: startDate
        };
        
        let res;
        if (!id) {
            res = await axios.post('http://localhost:4000/api/notes', detalle);
        } else {
            res = await axios.put(`http://localhost:4000/api/notes/${id}`, detalle);
        }

        toastr.success(res.data.message, 'Note', { timeOut: 1000 });

        setUsername('');
        setTitle('');
        setDescription('');
        setStartDate(new Date());

        setTimeout(() => {
            navigate('/');
        }, 1500);
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
                <div className="card border-0 shadow-sm mt-4">
                    <div className="card-header bg-white border-0 pt-4 pb-0">
                        <h3 className="fw-bold"><i className="bi bi-pencil-square text-primary me-2"></i>{id ? 'Edit Note' : 'Create Note'}</h3>
                    </div>

                    <div className="card-body">
                        <form onSubmit={onSubmitForm} className="mt-2">
                            <div className="form-group mb-4">
                                <label className="form-label text-muted">Author</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0"><i className="bi bi-person"></i></span>
                                    <select name="username" value={username} className="form-select border-0 bg-light" onChange={selectUser}>
                                        {users.length === 0 && <option value="" disabled>No users available</option>}
                                        {
                                            users.map(user => (
                                                <option value={user.username} key={user._id}>{user.username}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label text-muted">Title</label>
                                <div className="input-group">
                                     <span className="input-group-text bg-light border-0"><i className="bi bi-type-h1"></i></span>
                                    <input name="title" type="text" value={title}
                                        className="form-control border-0 bg-light"
                                        placeholder="Note title"
                                        onChange={(e) => setTitle(e.target.value)}
                                        required />
                                </div>
                            </div>

                            <div className="form-group mb-4">
                                <label className="form-label text-muted">Description</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0 align-items-start pt-3"><i className="bi bi-text-paragraph"></i></span>
                                    <textarea name="description" className="form-control border-0 bg-light"
                                        value={description}
                                        placeholder="Write your note here..."
                                        rows="4"
                                        onChange={(e) => setDescription(e.target.value)}
                                        required />
                                </div>
                            </div>

                            <div className="form-group mb-5">
                                <label className="form-label text-muted">Date</label>
                                <div className="input-group">
                                    <span className="input-group-text bg-light border-0"><i className="bi bi-calendar-date"></i></span>
                                    <DatePicker className="form-control border-0 bg-light w-100"
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date)}
                                        dateFormat="MMMM d, yyyy"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary btn-lg">
                                    <i className="bi bi-save me-2"></i>Save Note
                                </button>
                                <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
