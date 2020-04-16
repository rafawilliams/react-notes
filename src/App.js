import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
//import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      <Route path="/" exact component={NotesList}></Route>
      <Route path="/edit/:id" component={CreateNote}></Route>
      <Route path="/create" component={CreateNote}></Route>
      <Route path="/user" component={CreateUser}></Route>
      </div>
      
    </Router>
  );
}

export default App;
