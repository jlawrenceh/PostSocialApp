import React, { useEffect, useState, useContext } from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import "../styles/home.css";
import "../styles/comment.css";

function Post() {

    let {id} = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    
    const {authState} = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
           console.log(response.data);
           setPostObject(response.data);
        })

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
          setComments(response.data);
        })
    },[]);

    const addComment = () => {
      axios
        .post("http://localhost:3001/comments", 
        {
          commentBody: newComment, 
          PostId: id 
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then((response) => {
          if ( response.data.error) {
            console.log(response.data.error);
          } else {
            console.log("comment added");
            const commentToAdd = {
              commentBody: newComment,
              username: response.data.username
            };
            setComments([...comments, commentToAdd]);
            setNewComment("");
          }

        })
    }

    const deleteComment = (id) => {
      axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setComments(
          comments.filter((val) => {
            return val.id != id;
          })
        );
      });
  };

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

        <div>
          <div className="new_comment">
            <i className='bx bxs-user-circle post_owner_icon'></i>

            <div className="new_comment_wrapper">
              <input type="text"
              className="new_comment_text" 
              value={newComment}
              placeholder="Add a comment..."
                onChange = {
                  (event) => { setNewComment(event.target.value)}
                }
              />
              <i class='bx bx-send send-icon' onClick={() => {addComment()}}></i>
            </div>
          </div>
          <div  className="comment_section">
            
            <div>
              {comments.map((comment,key) => {
                return (
                  <>
                    <div key={key} className="comment_item">
                      <div className="comment_owner">
                        <i className='bx bxs-user-circle comment_owner_icon'></i>
                        {comment.username}
                      </div>

                      <div className="comment_content">
                        {comment.commentBody}
                      </div>
                      {authState.username === comment.username &&
                      <>
                      <button onClick={() => {
                        deleteComment(comment.id);
                        }}> 
                        X 
                      </button>
                      </>
                      }
                    </div>
                  </>
                )
              })}
            </div>
            
          </div>
        </div>
    </div>
  )
}

export default Post