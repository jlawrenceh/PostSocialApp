import React, { useState } from 'react'
import axios from "axios"
function Changepassword() {

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    
     const changepassword = () => {
        axios.put(
            "http://localhost:3001/auth/changepassword",
            {
                oldPassword: oldPassword,
                newPassword: newPassword
            },
            {
                headers: { 
                    accessToken: localStorage.getItem("accessToken") 
                }
            }
        ).then((response) => {
            if(response.data.error) 
            {
                alert(response.data.error);
            }

            console.log(response);
        });

     }
     
  
  return (
    <div>
      <h1>Change your password</h1>
      <input type="password" 
        placeholder="password"
        onChange={(event) => setOldPassword(event.target.value)}/> 

      <input type="password" 
        placeholder="new password"
        onChange={(event) => setNewPassword(event.target.value)}/>

      <button onClick={ ()=> {changepassword() }}>save changes</button>
    </div>
  )
}

export default Changepassword