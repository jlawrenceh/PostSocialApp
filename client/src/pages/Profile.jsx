import React, {useContext, useEffect, useState} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Profile() {

    let {id} = useParams();
    let navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
    const {authState } = useContext(AuthContext);


    useEffect(() =>{
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
            setUsername(response.data.username);
        });

        axios.get(`http://localhost:3001/posts/byUserId/${id}`).then((response) => {
            setListOfPosts(response.data);
        });

    }, []);

  
  return (
    <div>
        <h1>user: {username} </h1>
        {authState.username===username && (
          <>
           <button onClick={() => navigate("/changepassword")}>change my password</button>
          </>
        )}
       

        {listOfPosts.map((value, key) => {
          return (
            <>
            <div className="post_item">
              <div className="home_post_container" 
                onClick={ () => {
                  navigate(`/post/${value.id}`);
              }}>
                <div className="post_owner">
                  <i className='bx bxs-user-circle post_owner_icon'></i>
                  {value.username}
                </div>

                <div className="post_title">
                  {value.title}
                </div>

                <div className="post_content">
                {value.postText}
                </div>  

                
              </div>

              <div className="post_info">
                    <div className="likes_no" >
                      <i className='bx bxs-like post_info_icon' ></i>
                      {value.Likes.length}
                    </div>
                </div>
            </div>
            </>
          )
        })}
    </div>
  )
}

export default Profile