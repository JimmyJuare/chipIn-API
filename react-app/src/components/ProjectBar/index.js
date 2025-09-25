import React, { useEffect } from "react";
import * as projectStore from "../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import { Link } from "react-router-dom/";
import "./index.css";
import ProjectForm from "../ProjectForm";

export default function ProjectBar() {
  const projects = useSelector((state) => state.projects.projects || []);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  let filteredProjects
  if(user && projects){
    filteredProjects = projects.filter(
      (project) => project.user_id === user.id
    );
  }
  useEffect(() => {
    dispatch(projectStore.fetchUserProjects(user.id));
  }, [dispatch, user.id]);

  return (
    <>
      <div className="project-bar">
        <OpenModalButton
          className="modal-button"
          buttonText="create project"
          modalComponent={<ProjectForm />}
        ></OpenModalButton>
        <Link
              to={`posts/current`}
            >
              <button className="modal-button">manage posts</button>
            </Link>
            <h3 className="project-bar-header">My Projects</h3>
        {Array.isArray(filteredProjects) && filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Link
              to={`projects/${project.id}`}
              key={project.id}
              className="project"
            >
              <div>
                <p className="project-name">{project.project_name}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="no-projects">No Projects</p>
        )}
      </div>
    </>
  );
}
