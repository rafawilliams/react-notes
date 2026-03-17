import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
//import './App.css';
import './index.css';
import Navigation from './components/Navigation';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';
import NotesList from './components/NotesList'

function App() {
  return (
    <Router>
      <Navigation/>
      <div className="container p-4">
        <Routes>
          <Route path="/" element={<NotesList />} />
          <Route path="/edit/:id" element={<CreateNote />} />
          <Route path="/create" element={<CreateNote />} />
          <Route path="/user" element={<CreateUser />} />
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
