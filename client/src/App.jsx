import { useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import './App.css'
import './styles/navbar.css';

import axios from 'axios';

import Home from "./pages/Home";
import Createpost from "./pages/Createpost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./helpers/AuthContext";

function App() {
  const [authState, setAuthState] = useState({ username: "", id: 0, status: false});

 

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({...authState, status:false});
           
        } else {
  
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          })
      
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState(false);
  }

  
  return (
    <>
      <div className="App">
        <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <header>
            <div className="navbar container">
              <div>
              <a className="nav_logo"> Post! </a>
             
              {authState.status && (
                <>
                  <span> | </span>
                  <span>{authState.username}</span>
                </>
              )}
              
              </div>
             
                <ul className="navbar_links">
                    <>
                      {authState.status? (
                      <>
                        <li>
                          <Link to="/"> Home</Link>
                        </li>
                        <li>
                          <Link to="/createpost"> Write a Post</Link>
                        </li>
                        <li>
                          <button onClick={logout}> Log out</button>
                        </li>
                      </>
                      ) : (
                      <>
                        <li>
                          <Link to="/login"> Log in</Link>
                        </li>
                        <li>
                          <Link to="/register"> Register</Link>
                        </li>
                      </>
                      )}
                    </>
                </ul>
            </div>
          </header>
          <div className="content container">
          <Routes>
            <Route path = "/" element={<Home/>}/>
            <Route path = "/createpost" element={<Createpost/>}/>
            <Route path = "/post/:id" element={<Post/>}/>
            <Route path = "/login" element={<Login/>}/>
            <Route path = "/register" element={<Registration/>}/>
          </Routes>
          </div>

        </Router>
        </AuthContext.Provider>
      </div>
    </>
  )
}

export default App
