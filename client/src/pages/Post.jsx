import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import "../styles/home.css";
import "../styles/comment.css";

function Post() {

    let navigate = useNavigate();
    let {id} = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const {authState} = useContext(AuthContext);

    useEffect(() =>{
      if (!localStorage.getItem("accessToken")){
          navigate("/login");
      }
    })

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/${id}`).then((response) => {
           setPostObject(response.data);
           console.log(response.data);
           console.log(response.data.postText);
           console.log(response.data.Likes.length);
        });

        axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
          setComments(response.data);
        })
    },[id]);

    const addComment = () => {
      axios
      .post("http://localhost:3001/comments", {
        commentBody: newComment,
        PostId: id,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: response.data.commentBody,
            username: response.data.username,
            id: response.data.id,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

    const deleteComment = (id) => {
      axios
        .delete(`http://localhost:3001/comments/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
          setComments(
            comments.filter((val) => {
              return val.id != id;
            })
          );
        });
    };

    const deletePost = (id) => {
      axios.delete(
        `http://localhost:3001/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") }
        })
      .then(()=>{
        alert("delete success");
        navigate("/");
      })
    }

    const editPost = (option) => {
      if (option === "title") {
          let newTitle = prompt("Enter new title:");
          if (newTitle!==null)
          {
            axios.put(
              "http://localhost:3001/posts/newtitle", 
              {
                newTitle: newTitle,
                id: id,
              },
              {
                headers: 
                { 
                  accessToken: localStorage.getItem("accessToken") 
                }
              }
            )
            setPostObject({...postObject, title: newTitle})
          }
      } else {
        let newPostText = prompt("Enter new post text:");
        if (newPostText!==null)
        {
          axios.put(
            "http://localhost:3001/posts/newposttext", 
            {
              postText: newPostText,
              id: id,
            },
            {
              headers: 
              { 
                accessToken: localStorage.getItem("accessToken") 
              }
            }
          )
          setPostObject({...postObject, postText: postText})
        }
      }

      
    };
  return (
    <div>
        <div className="post_item">
          <div className="post_container">
            <div className="post_owner">
              <i className='bx bxs-user-circle post_owner_icon'></i>
              {postObject.username} 
              {authState.username === postObject.username && ( 
              <>
                <button onClick={() => {deletePost(postObject.id) }}> delete </button>
              </>
              )}
            </div>

            <div className="post_title" onClick={() => {
              if (authState.username === postObject.username) {
                editPost("title");
              }
            }}>
              {postObject.title}
            </div>

            <div className="post_content " onClick={() => {
               if (authState.username === postObject.username) {
                editPost("body");
              }
            }}>
            {postObject.postText}
            </div>  

            <div className="post_info">
                <div className="likes_no">
                  <i className='bx bxs-like post_info_icon' ></i>
               
                  {postObject.Likes ? postObject.Likes.length : 0}
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