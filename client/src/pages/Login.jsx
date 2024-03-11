import React, {useState, useContext } from 'react';
import "../styles/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();
  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username, 
          id: response.data.id, 
          status: true});
        navigate("/");
      }
    });
  };

  return (
    <div className="Login container"> 

      <div className="login_form">

        <h2>
          Login to Post!
        </h2>

        <div>
          <input 
            type="text" 
            className="login_user" 
            placeholder="Username" 
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            />
        </div>

        <div>
          <input 
            type="password" 
            className="login_pass" 
            placeholder="Password" 
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            />
        </div>

        <div>
          <button className="login_button" onClick={login}>LOGIN</button>
        </div>

      </div>
    </div>
  )
}

export default Login