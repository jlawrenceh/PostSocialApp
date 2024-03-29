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
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import Changepassword from "./pages/Changepassword";
import { AuthContext } from "./helpers/AuthContext";

function App() {
  const [authState, setAuthState] = useState({ username: "", id: 0, status: false});
  const [numberOfPosts, setNumberOfPosts] = useState(0);
 
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
/*
  useEffect(() => {
    axios.get(`http://localhost:3001/posts/numberofposts/${authState.id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then((response) => {
      setNumberOfPosts(response.data);
    }) 
  },[authState])
  */

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
         
          <div className="page_body">
          {/*            
            <div className="side_div">
             {authState.status && (
              <>
               <div className="side_div_content">
                <div className="side_div_userinfo">
                  <i className='bx bxs-user-circle post_owner_icon'/>
                  {authState.username}
                </div>

                <div className="side_div_postsinfo">
                  <span>Posts</span>
                  <span>{numberOfPosts}</span>
                </div>

                <Link to = {`/profile/${authState.id}`}>
                      View my posts
                </Link>
                <Link to="/changepassword"> Change Password</Link>
                
               </div>
               </>
               
             )}
            </div>
            */}  
            
            <div className="content container">
            <Routes>
              <Route path = "/" element={<Home/>}/>
              <Route path = "/createpost" element={<Createpost/>}/>
              <Route path = "/post/:id" element={<Post/>}/>
              <Route path = "/login" element={<Login/>}/>
              <Route path = "/register" element={<Registration/>}/>
              <Route path = "/profile/:id" element={<Profile/>}/>
              <Route path = "/changepassword" element={<Changepassword/>}/>
              <Route path = "*" element={<PageNotFound/>}/>
            </Routes>
            </div>
          
          </div>

        </Router>
        </AuthContext.Provider>
      </div>
    </>
  )
}

export default App
