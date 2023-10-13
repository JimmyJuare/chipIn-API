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
  const post = useSelector(state => state.posts.posts)
  let project_id = post.project_id

  
  useEffect(() => {
    dispatch(postStore.getOnePostThunk(post_id));
  }, [dispatch, post_id]);
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      console.log('this is the title', title);
      setBody(post.body);
      setStatus(post.status || "draft"); // Use post.status or set a default value like "draft"
    }
  }, [post]);
  
  console.log('this is the post:', post);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title,
      body,
      status,
      project_id
    };
    try {
      const editedPost = await dispatch(
        postStore.editPostThunk(post_id, data)
      );
      if (editedPost) {
        history.push(`/posts/${post_id}`);
      }
    } catch (resErr) {
      console.error(resErr);
      if (Array.isArray(resErr.errors)) {
        setErrors({ title: "Title is required" });
      } else {
        setErrors({ body: "Body is required" });
      }
    }

    closeModal();
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
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
        <button onClick={closeModal}>Cancel</button>
        <button type="submit">Edit Post</button>
      </form>
    </div>
  );
};

export default EditPost;
