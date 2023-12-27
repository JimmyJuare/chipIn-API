import React, { useEffect, useState } from "react";
import * as projectStore from "../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditPost from "../EditPost";
import { Link } from "react-router-dom/";
import "./index.css";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import * as postStore from "../../store/posts";

import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ProjectSettingBar from "../ProjectSettingBar";
import CreatePostForm from "../CreatePostForm";

// ... (imports)

export default function ProjectPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts?.posts || []);
  const project = useSelector((state) => state.projects.currentProject || []);
  const user = useSelector((state) => state.session.user);
  const { project_id } = useParams();
  const projectId = parseInt(project_id);

  useEffect(() => {
    dispatch(projectStore.fetchProject(project_id));
    dispatch(projectStore.fetchUserProjects(user.id));
    dispatch(postStore.getUserPostsThunk(user.id));
  }, [dispatch]);

  // Check if there are any posts associated with the current project
  const hasPosts = posts.some((post) => post.project_id === projectId);

  return (
    <div className="project-page-wrapper">
      <ProjectSettingBar />
      <div className="inner-wrapper">
        <div className="project-wrapper">
          <h2>{project.project_name}</h2>
          <p>{project.description}</p>
          {(!hasPosts && (
            <OpenModalButton
              className="modal-button"
              buttonText="Create a Post for this project"
              modalComponent={<CreatePostForm projectId={projectId} />}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
