import React , {useEffect, useContext} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

import "../styles/createpost.css";

function Createpost() {

    const {authState} = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(() => {
      if(!authState.status){
        navigate("/login");
      }
    }, []);
    
    const initialValues = {
        title: "",
        postText: "",
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Input your title"),
        postText:  Yup.string().required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data,
        { headers: { accessToken: localStorage.getItem("accessToken") } } 
        ).then((response) => {
          navigate("/");
        });
      };

  return (
    <div className="createpost container">
      <div className="createpost_heading">
        <h2> Write a post</h2>
      </div>

        <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">

          <ErrorMessage name="title" component="span" />
          <Field
            className = "create_title"
            autocomplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="Title"
          />

          <ErrorMessage name="postText" component="span" />
      
          <Field
            className="create_content"
            type="textarea"
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="Post"
          />

          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Createpost