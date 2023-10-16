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
  const [errors, setErrors] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const allPosts = useSelector((state) => state.posts.posts);
  const selectedPost = useSelector((state) => state.posts.currentPost || []);

  const foundPost = allPosts.find((post) => post.id === post_id);
  let project_id = null;

  if (foundPost) {
    project_id = foundPost.project_id;
  }

  useEffect(() => {
    const currentPost = dispatch(postStore.getOnePostThunk(post_id));

    if (currentPost) {
      setTitle(foundPost.title);
      setBody(foundPost.body);
      setStatus(foundPost.status);
    }
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = [];

    if (title.length < 3) {
      newErrors.push("Title must be at least 3 characters");
    }

    if (body.length < 5) {
      newErrors.push("Body must be at least 5 characters");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return; // Don't proceed with submission if there are errors
    }

    const data = {
      title,
      body,
      status: "Published",
      project_id,
    };

    try {
      const editedPost = await dispatch(postStore.editPostThunk(post_id, data));
      if (editedPost) {
        console.log("hitting editpost");
        history.push(`/`);
        closeModal();
        setRedirect(true);
      }
    } catch (resErr) {
      console.error(resErr);
      // Handle additional errors if needed
    }
  };

  return (
    <div className="edit-form">
      <h1>Edit Post</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label htmlFor="title">Title</label>
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
