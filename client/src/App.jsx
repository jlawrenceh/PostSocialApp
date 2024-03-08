import { useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css'
import './styles/navbar.css';

import axios from 'axios';

import Home from "./pages/Home";
import Createpost from "./pages/Createpost";
import Post from "./pages/Post";

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
                        <Link to="/createpost"> Write a Post</Link>
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
            <Route path = "/createpost" element={<Createpost/>}/>
            <Route path = "/post/:id" element={<Post/>}/>
          </Routes>
          </div>

        </Router>
      </div>
    </>
  )
}

export default App