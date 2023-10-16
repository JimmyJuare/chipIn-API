import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as postStore from "../../store/posts";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import './index.css'
export default function DeletePost({post_id}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  // const { server_id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(postStore.deletePostThunk(post_id));
    dispatch(postStore.getPostsThunk());
    closeModal();
  };

  return (
    <div className="delete-button">
      <h1>Delete Post</h1>
      <form onSubmit={handleSubmit}>
        <button onClick={closeModal}>Cancel</button>
        <button type="submit">Delete Post</button>
      </form>
    </div>
  );
}
