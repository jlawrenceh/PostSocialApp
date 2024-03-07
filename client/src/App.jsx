import { useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css'
import './styles/navbar.css';

import axios from 'axios';

import Home from "./pages/Home";

function App() {

  return (
    <>
      <div className="App">
   
        <Router>
          <header>
            <div className="navbar container">
              <div>
              <a className="nav_logo"> Post! </a>
              <span> | </span>
              <span>username</span>
              </div>
             
                <ul className="navbar_links">
                    <>
                      <li>
                        <Link to="/"> Home</Link>
                      </li>
                      <li>
                        <Link to="/"> Write a Post</Link>
                      </li>
                      <li>
                        <Link to="/"> Log out</Link>
                      </li>
                    </>
                </ul>
            </div>
          </header>
          <div className="content container">
          <Routes>
            <Route path = "/" element={<Home/>}/>
          </Routes>
          </div>

        </Router>
      </div>
    </>
  )
}

export default App
