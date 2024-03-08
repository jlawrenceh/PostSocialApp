import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";

import "../styles/home.css";
function Post() {

    let {id} = useParams();
    const [postObject, setPostObject] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
           console.log(response.data);
           setPostObject(response.data);
        })
    },[]);
  return (
    <div>
        <div className="post_item">
          <div className="post_container">
            <div className="post_owner">
              <i className='bx bxs-user-circle post_owner_icon'></i>
              {postObject.username}
            </div>

            <div className="post_title">
              {postObject.title}
            </div>

            <div className="post_content">
            {postObject.postText}
            </div>  

            <div className="post_info">
                <div className="likes_no">
                  <i className='bx bxs-like post_info_icon' ></i>
                  2 
                </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Post