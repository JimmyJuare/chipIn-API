import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postStore from "../../store/posts";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

const EditPost = ({ post_id }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("draft"); // Default status is draft
  const [error, setErrors] = useState("");
  const [oldData, setOldData] = useState({});
  const allPosts = useSelector(state => state.posts.posts);
const selectedPost = useSelector(state => state.posts.currentPost || []);

console.log('this is the selectedPost', selectedPost);
const foundPost = allPosts.find(post => post.id === post_id);
let project_id = null;

if (foundPost) {
  project_id = foundPost.project_id;
}






  useEffect(()=>{
      
      const currentPost = dispatch(postStore.getOnePostThunk(post_id))
      
      if(currentPost){
        setTitle(selectedPost[0].title)
        setBody(selectedPost[0].body)
        setStatus(selectedPost[0].status)
      }

  },[dispatch])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      body,
      status:"Published",
      project_id
    };
    try {
      await dispatch(
        postStore.editPostThunk(post_id, data)
      );
        console.log('hitting editpost')
        history.push(`/`);
        closeModal();

    } catch (resErr) {
      console.error(resErr);
      if (Array.isArray(resErr.errors)) {
        setErrors({ title: "Title is required" });
      } else {
        setErrors({ body: "Body is required" });
      }
    }
  };

  return (
    <div className="edit-form">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {error.name ? (
          <label className="error-text" htmlFor="name">
            {error.name}
          </label>
        ) : (
          <label htmlFor="title">Title</label>
        )}
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="body">Body</label>
        <textarea
          type="text"
          id="body"
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button onClick={closeModal}>Cancel</button>
        <button type="submit">Edit Post</button>
      </form>
    </div>
  );
};

export default EditPost;
