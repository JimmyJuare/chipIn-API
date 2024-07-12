import React, { useState } from "react";
import * as projectStore from "../../store/projects";
import { useDispatch } from "react-redux";
import "./index.css";
import { useModal } from "../../context/Modal";

export default function ProjectForm() {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (name.length < 3) {
      setNameError("Project name must be at least 3 characters");
      isValid = false;
    } else {
      setNameError("");
    }

    if (description.length < 5) {
      setDescriptionError("Project description must be at least 5 characters");
      isValid = false;
    } else {
      setDescriptionError("");
    }

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

    await dispatch(projectStore.createProject(data));
    closeModal();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="project-form">
        <h2>Create Project</h2>
        <label htmlFor="name">Project Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {nameError && <div className="error">{nameError}</div>}

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
        />
        {descriptionError && <div className="error">{descriptionError}</div>}

        <button onClick={closeModal}>Cancel</button>
        <button type="submit">Create Project</button>
      </form>
    </>
  );
}
