import React, { useEffect, useState } from "react";
import * as projectStore from "../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditPost from "../EditPost";
import { Link } from "react-router-dom/";
import "./index.css";
import { useModal } from "../../context/Modal";
import { useHistory } from "react-router-dom";

export default function ProjectForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const projects = useSelector((state) => state.projects || []);
  const user = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState(""); // Default status is draft
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      project_name: name,
      project_type: type,
      description,
    };
    await dispatch(projectStore.createProject(data));

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
        >
         
        </textarea>
        <button onClick={closeModal}>Cancel</button>
        <button type="submit">Create Project</button>
      </form>
    </>
  );
}
