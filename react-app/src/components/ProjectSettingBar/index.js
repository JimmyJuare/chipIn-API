import React, { useDebugValue, useEffect } from "react";
import * as projectStore from "../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditPost from "../EditPost";
import { Link } from "react-router-dom/";
import "./index.css";
import { useParams } from "react-router-dom";
import ProjectEditForm from "../ProjectEditForm";
import DeleteProject from "../DeleteProject";

export default function ProjectSettingBar() {
  const projects = useSelector((state) => state.projects.projects || []);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const {project_id} = useParams()
  const projectId = parseInt(project_id)
  return (
    <>
      <div className="project-bar">
        <OpenModalButton
          className="modal-button"
          buttonText="edit project"
          modalComponent={<ProjectEditForm projectId={projectId}/>}
        ></OpenModalButton>
        <OpenModalButton
          className="modal-button"
          buttonText="delete project"
          modalComponent={<DeleteProject projectId={projectId}/>}
        ></OpenModalButton>
        
      </div>
    </>
  );
}
