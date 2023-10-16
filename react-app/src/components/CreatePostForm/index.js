import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as postStore from "../../store/posts";
import * as projectStore from "../../store/projects";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom"
import './index.css'
const CreatePostForm = ({projectId}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [status, setStatus] = useState("draft"); // Default status is draft
  const [error, setErrors] = useState("");
  const [imageInput, setImageInput] = useState("");
  const projects = useSelector((state) => state.projects?.userProjects || []);
  const posts = useSelector((state) => state.posts?.userPosts || []);
  const user = useSelector((state) => state.session.user);
  const { closeModal } = useModal();
  console.log('this is the project_id', projectId);
  useEffect(() => {
    dispatch(projectStore.fetchUserProjects(user.id));
    dispatch(postStore.getUserPostsThunk(user.id));
  }, [dispatch]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    let data;
    let newImage;
    if (imageInput) {
      data = new FormData();
      data.append("title", title);
      data.append("image_url", imageInput);
      data.append("body", body);
      data.append("status", "Published");
      data.append("project_id",  projectId);
      // data.append("project_id", project_id)
      newImage = true;
    } else {
      data = {
        title: title,
        body: body,
        status: 'Published',
        project_id:projectId,
      };
      newImage = false;
    }

    let createdPost;
    try {
      setImageLoading(true);
      createdPost = await dispatch(postStore.addPostThunk(data, newImage));
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
    history.push("/");
    closeModal()
  };

  return (
    <>
      <div className="create-form">
        <h1>Create Post</h1>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* <input
      type="file"
      accept="image/*"
      id="image_url"
      name="image_url"
      onChange={(e) => setImageInput(e.target.files[0])}
      /> */}
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
          {/* <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select> */}
          <button type="submit">Create Post</button>
        </form>
      </div>
    </>
  );
};

export default CreatePostForm;
