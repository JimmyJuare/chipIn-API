import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as projectStore from "../../store/projects";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const ProjectEditForm = ({ projectId }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const project = useSelector((state) => state.projects.currentProject || []);
  const user = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [error, setErrors] = useState("");
  const [description, setDescription] = useState(""); // Default status is draft

  useEffect(() => {
    dispatch(projectStore.fetchProject(projectId));
    if (project) {
      setName(project.project_name);
      setType(project.project_type);
      setDescription(project.description);
    }
  }, [dispatch]);

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (name.length < 3) {
      errors.name = "Project name must be at least 3 characters";
      isValid = false;
    }

    if (description.length < 5) {
      errors.description = "Project description must be at least 5 characters";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = {
      project_name: name,
      project_type: type,
      description,
    };

    try {
      const editedPost = await dispatch(
        projectStore.updateProject(projectId, data)
      );
      if (editedPost) {
        history.push(`/projects/${projectId}`);
      }
    } catch (resErr) {
      console.error(resErr);
      if (Array.isArray(resErr.errors)) {
        setErrors({ name: "Name is required" });
      } else {
        setErrors({ description: "Description is required" });
      }
    }

    dispatch(projectStore.fetchProject(projectId));
    closeModal();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="project-form">
        <h2>Edit Project</h2>
        <label htmlFor="name">Project Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {error.name && <div className="error">{error.name}</div>}

        <label htmlFor="type">Project Type</label>
        <select
          id="type"
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="Art">Art</option>
          <option value="Software">Software</option>
          <option value="Music">Music</option>
          <option value="Film">Film</option>
        </select>

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {error.description && <div className="error">{error.description}</div>}

        <button onClick={closeModal}>Cancel</button>
        <button type="submit">Edit Project</button>
      </form>
    </>
  );
};

export default ProjectEditForm;
