import OpenModalButton from "../OpenModalButton";
import "./index.css";
import { useParams } from "react-router-dom";
import ProjectEditForm from "../ProjectEditForm";
import DeleteProject from "../DeleteProject";

export default function ProjectSettingBar() {
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
