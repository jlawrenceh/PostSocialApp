import React from 'react'
import "../styles/login.css";

function Login() {
  return (
    <div className="Login container"> 

      <div className="login_form">

        <h2>
          Login to Post!
        </h2>

        <div>
          <input type="text" className="login_user" placeholder="Username" />
        </div>

        <div>
          <input type="password" className="login_pass" placeholder="Password" />
        </div>

        <div>
          <button className="login_button">LOGIN</button>
        </div>

      </div>
    </div>
  )
}

export default Login