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

export default function ProjectPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts?.userPosts || []);
  const projects = useSelector((state) => state.projects?.userProjects || []);
  const project = useSelector((state) => state.projects.currentProject || []);
  const user = useSelector((state) => state.session.user);
  let projectIsTrue;
  const { project_id } = useParams();
  const projectId = parseInt(project_id);
  let newArr = [];
  //grabs all project ids associated with posts
  for (let post of posts) newArr.push(post.project_id);

  //filters out projects by project id not associated with a post
  let newProjects = projects.filter((obj) => !newArr.includes(obj.id));
  for (let proj of newProjects) {
    if (proj.id === projectId) {
      projectIsTrue = true;
      break;
    } else projectIsTrue = false;
  }
  useEffect(() => {
    dispatch(projectStore.fetchProject(project_id));
    dispatch(projectStore.fetchUserProjects(user.id));
    dispatch(postStore.getUserPostsThunk(user.id));
  }, [dispatch]);
  return (
    <div className="project-page-wrapper">
      <ProjectSettingBar />
      <div className="inner-wrapper">
        <div className="project-wrapper">
          <h2>{project.project_name}</h2>
          <p>{project.description}</p>
          {projectIsTrue && (
            <>
              <OpenModalButton
                className="modal-button"
                buttonText="Create a Post for this project"
                modalComponent={<CreatePostForm projectId={projectId} />}
              ></OpenModalButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
