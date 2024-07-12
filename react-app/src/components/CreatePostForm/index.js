import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postStore from "../../store/posts";
import * as projectStore from "../../store/projects";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom"
import './index.css';

const CreatePostForm = ({ projectId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setErrors] = useState("");
  const [imageInput, setImageInput] = useState("");
  const user = useSelector((state) => state.session.user);
  const { closeModal } = useModal();
 

  useEffect(() => {
    dispatch(projectStore.fetchUserProjects(user.id));
    dispatch(postStore.getUserPostsThunk(user.id));
  }, [dispatch, user.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const errors = {};

    if (title.length < 3) {
      errors.title = "Title must be at least 3 characters";
    }

    if (body.length < 5) {
      errors.body = "Body must be at least 5 characters";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    let data;
    let newImage;

    if (imageInput) {
      data = new FormData();
      data.append("title", title);
      data.append("image_url", imageInput);
      data.append("body", body);
      data.append("status", "Published");
      data.append("project_id", projectId);
      newImage = true;
    } else {
      data = {
        title: title,
        body: body,
        status: 'Published',
        project_id: projectId,
      };
      newImage = false;
    }

    try {
      setImageLoading(true);
      await dispatch(postStore.addPostThunk(data, newImage));
      history.push("/");
      closeModal();
    } catch (errRes) {
      setImageLoading(false);

      if (Array.isArray(errRes.errors)) {
        let errorsObj = {};
        errRes.errors.forEach((err) => {
          const [key, val] = err.split(" : ");
          errorsObj[key] = val;
        });
        setErrors(errorsObj);
      } else {
        setErrors({ image: "There was an error uploading the image" });
      }
    }
  };

  return (
    <>
      <div className="create-form">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {error.title ? (
            <label className="error-text" htmlFor="title">
              {error.title}
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

          {error.body ? (
            <label className="error-text" htmlFor="body">
              {error.body}
            </label>
          ) : (
            <label htmlFor="body">Body</label>
          )}
          <textarea
            type="text"
            id="body"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />

          <button type="submit">Create Post</button>
        </form>
      </div>
    </>
  );
};

export default CreatePostForm;
