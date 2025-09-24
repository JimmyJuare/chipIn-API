import React, { useEffect } from "react";
import * as projectStore from "../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom/";
import "./index.css";
import ProjectForm from "../ProjectForm";

export default function RequestBar() {
  return (
    <>
      <div className="project-bar">
        
        <Link to={`posts/current`}>
          <button className="modal-button">manage posts</button>
        </Link>
        <h2 className="project-bar-header">My Projects</h2>
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
