const GET_PROJECTS = "projects/GET_PROJECTS";
const GET_PROJECT = "projects/GET_PROJECT";
const ADD_PROJECT = "projects/ADD_PROJECT";
const EDIT_PROJECT = "projects/EDIT_PROJECT";
const DELETE_PROJECT = "projects/DELETE_PROJECT";
const GET_USER_PROJECTS = "projects/GET_USER_PROJECTS";


// Action creators
export const getProjects = (projects) => ({ 
    type: GET_PROJECTS, 
    projects 
});
export const getProject = (project) => ({ 
    type: GET_PROJECT, 
    project 
});
export const addProject = (project) => ({ 
    type: ADD_PROJECT, 
    project 
});
export const editProject = (project) => ({ 
    type: EDIT_PROJECT, 
    project 
});
export const deleteProject = (projectId) => ({
  type: DELETE_PROJECT,
  projectId,
});
export const getUserProjects = (userProjects) => ({ type: GET_USER_PROJECTS, userProjects });

// Thunk actions
export const fetchProjects = () => async (dispatch) => {
  try {
    const response = await fetch("/api/projects");
    if (response.ok) {
      const projects = await response.json();
      dispatch(getProjects(projects));
    } else {
      console.error("Error fetching projects:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching projects:", error);
  }
};

export const fetchProject = (projectId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/projects/${projectId}`);
    if (response.ok) {
      const project = await response.json();
      dispatch(getProject(project));
    } else {
      console.error("Error fetching project:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching project:", error);
  }
};

export const createProject = (formData) => async (dispatch) => {
  try {
    const response = await fetch("/api/projects/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const newProject = await response.json();
      dispatch(addProject(newProject));
    } else {
      console.error("Error creating project:", response.statusText);
    }
  } catch (error) {
    console.error("Error creating project:", error);
  }
};

export const updateProject = (projectId, formData) => async (dispatch) => {
  try {
    const response = await fetch(`/api/projects/${projectId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const updatedProject = await response.json();
      dispatch(editProject(updatedProject));
    } else {
      console.error("Error updating project:", response.statusText);
    }
  } catch (error) {
    console.error("Error updating project:", error);
  }
};

export const removeProject = (projectId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(deleteProject(projectId));
    } else {
      console.error("Error deleting project:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting project:", error);
  }
};
export const fetchUserProjects = (userId) => async (dispatch) => {
    try {
      const response = await fetch(`/api/projects/user/${userId}`);
      if (response.ok) {
        const userProjects = await response.json();
        dispatch(getUserProjects(userProjects));
      } else {
        console.error("Error fetching user projects:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user projects:", error);
    }
  };
const initialState = {
    projects: [],
    currentProject: null,
  };
  
  const projectReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PROJECTS:
        return { ...state, projects: action.projects };
      case GET_PROJECT:
        return { ...state, currentProject: action.project };
      case ADD_PROJECT:
        return { ...state, projects: [...state.projects, action.project] };
      case EDIT_PROJECT:
        return {
          ...state,
          projects: state.projects.map((p) =>
            p.id === action.project.id ? action.project : p
          ),
          currentProject: action.project,
        };
      case DELETE_PROJECT:
        return {
          ...state,
          projects: state.projects.filter((p) => p.id !== action.projectId),
          currentProject: null,
        };
        case GET_USER_PROJECTS:
      return { ...state, userProjects: action.userProjects };
      default:
        return state;
    }
  };
  
  export default projectReducer;
  