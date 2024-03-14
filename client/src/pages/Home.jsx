import '../styles/home.css';
import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../helpers/AuthContext";

function Home() {

  let navigate = useNavigate();

  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const {authState} = useContext(AuthContext);
  

  useEffect(() => {
    if(!authState.status){
      navigate("/login");
    } else {
      axios.get("http://localhost:3001/Posts", 
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
      ).then((response) =>{
        console.log(response.data);
        setListOfPosts(response.data.listOfPosts);
        setLikedPosts(response.data.likedPosts.map((like) => {
          return like.PostId;
        }));
      });
    }
  }, []);

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likesArray = post.Likes;
                likesArray.pop();
                return { ...post, Likes: likesArray };
              }
            } else {
              return post;
            }
          })
        );

        if (likedPosts.includes(postId)) {
          setLikedPosts (
            likedPosts.filter((id) => {
              return id!=postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };


  return (
    <div className="home container">
        
        {listOfPosts.map((value, key) => {
          return (
            <>
            <div className="post_item">
              <div className="home_post_container" 
                >
                <div className="post_owner">
                  <i className='bx bxs-user-circle post_owner_icon'></i>
                  <Link to = {`/profile/${value.UserId}`}>
                    {value.username}
                  </Link>
                </div>

                <div onClick ={ () => {
                  navigate(`/post/${value.id}`);
              }}>
                  <div className="post_title">
                    {value.title}
                  </div>

                  <div className="post_content">
                  {value.postText}
                  </div>  
                </div>
                
              </div>

              <div className="post_info">
                    <div className="likes_no" onClick={() => {likeAPost(value.id)}}>
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

export default Home