import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import axios from "axios";
function Profile() {

    let {id} = useParams();
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPosts] = useState([]);
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
        
    </div>
  )
}

export default Profile