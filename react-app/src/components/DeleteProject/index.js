import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as projectStore from "../../store/projects";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function DeleteProject({ projectId}) {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const { closeModal } = useModal();
  console.log('this is the id', projectId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(projectStore.removeProject(projectId));
    dispatch(projectStore.fetchUserProjects(user.id));
    closeModal();
    history.push('/')
  };

  return (
    <div>
      <h1>Delete Project</h1>
      <form onSubmit={handleSubmit}>
        <button onClick={closeModal}>Cancel</button>
        <button type="submit">Delete Project</button>
      </form>
    </div>
  );
}
