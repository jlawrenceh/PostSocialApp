import '../styles/home.css';

import React, {useEffect, useState, useContext} from "react";
import axios from "axios";

import ThumbUpIcon from '@mui/icons-material/ThumbUp';

function Home() {

  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/Posts").then((response) =>{
      console.log(response.data);
      setListOfPosts(response.data);
    });
  }, []);


  return (
    <div className="home container">
        
        {listOfPosts.map((value, key) => {
          return (
            <>
            <div className="post_item">
              <div className="post_container">
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

                <div className="post_info">
                    <div className="likes_no">
                      <i className='bx bxs-like post_info_icon' ></i>
                      2 
                    </div>
                </div>
              </div>
            </div>
            </>
          )
        })}
        
        


    </div>
  )
}

export default Home