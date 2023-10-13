import React, { useDebugValue, useEffect } from "react";
import * as projectStore from "../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditPost from "../EditPost";
import { Link } from "react-router-dom/";
import "./index.css";
import { useParams } from "react-router-dom";
import ProjectForm from "../ProjectForm";

export default function ProjectBar() {
  const projects = useSelector((state) => state.projects.projects || []);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  console.log("these are the projects", projects);
  let filteredProjects
  if(user && projects){
    filteredProjects = projects.filter(
      (project) => project.user_id === user.id
    );
  }
  console.log("these are the current users proejcts", filteredProjects);
  useEffect(() => {
    dispatch(projectStore.fetchProjects());
  }, [dispatch]);

  return (
    <>
      <div className="project-bar">
        <OpenModalButton
          className="create-project-button"
          buttonText="create project"
          modalComponent={<ProjectForm />}
        ></OpenModalButton>
        {Array.isArray(filteredProjects) && filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Link
              to={`projects/${project.id}`}
              key={project.id}
              className="project"
            >
              <div>
                <p>{project.project_name}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No projects available</p>
        )}
      </div>
    </>
  );
}
