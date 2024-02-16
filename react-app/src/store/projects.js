const GET_PROJECTS = "projects/GET_PROJECTS";
const GET_PROJECT = "projects/GET_PROJECT";
const ADD_PROJECT = "projects/ADD_PROJECT";
const EDIT_PROJECT = "projects/EDIT_PROJECT";
const DELETE_PROJECT = "projects/DELETE_PROJECT";
const GET_USER_PROJECTS = "projects/GET_USER_PROJECTS";
const SEND_JOIN_REQUEST = "projects/SEND_JOIN_REQUEST";
export const JOIN_REQUEST_SUCCESS = "projects/JOIN_REQUEST_SUCCESS";
export const JOIN_REQUEST_FAILURE = "projects/JOIN_REQUEST_FAILURE";
export const GET_JOIN_REQUESTS = "projects/GET_JOIN_REQUESTS";
export const JOIN_REQUEST_START = "projects/JOIN_REQUEST_START";
export const JOIN_REQUEST_END = "projects/JOIN_REQUEST_END";
// In your action creators file
// Action creators
export const joinRequestSuccess = () => ({
  type: JOIN_REQUEST_SUCCESS,
});

export const joinRequestFailure = () => ({
  type: JOIN_REQUEST_FAILURE,
});

export const getProjects = (projects) => ({
  type: GET_PROJECTS,
  projects,
});
export const getProject = (project) => ({
  type: GET_PROJECT,
  project,
});
export const addProject = (project) => ({
  type: ADD_PROJECT,
  project,
});
export const editProject = (project) => ({
  type: EDIT_PROJECT,
  project,
});
export const deleteProject = (projectId) => ({
  type: DELETE_PROJECT,
  projectId,
});
export const sendJoinRequest = (projectId) => ({
  type: SEND_JOIN_REQUEST,
  projectId,
});

export const getUserProjects = (userProjects) => ({
  type: GET_USER_PROJECTS,
  userProjects,
});
export const getJoinRequests = (joinRequests) => ({
  type: GET_JOIN_REQUESTS,
  joinRequests,
});
export const joinRequestStart = () => ({
  type: JOIN_REQUEST_START,
});
export const joinRequestEnd = () => ({
  type: JOIN_REQUEST_END,
});

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

export const requestToJoinProject = (projectId) => async (dispatch) => {
  try {

    dispatch(joinRequestStart());
    const response = await fetch(`/api/projects/${projectId}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      dispatch(sendJoinRequest(projectId));

    } else {
      console.error("Error sending join request:", response.statusText);
    }
  } catch (error) {
    console.error("Error sending join request:", error);
  } finally {
    // Dispatch an action to indicate the end of the join request
    dispatch(joinRequestEnd());
  }
};
export const fetchJoinRequests = (userId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/projects/${userId}/join-requests`);
    if (response.ok) {
      const joinRequests = await response.json();
      dispatch(getJoinRequests(joinRequests));
    } else {
      console.error("Error fetching join requests:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching join requests:", error);
  }
};
const initialState = {
  projects: [],
  currentProject: null,
  isJoinRequestPending: false,
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
    case SEND_JOIN_REQUEST:
      // Assuming your state has a property like isJoinRequestPending
      return {
        ...state,
        isJoinRequestPending: true, // Set a flag to indicate that a request is in progress
      };
    case JOIN_REQUEST_SUCCESS:
      // Update the state to reflect the successful join request
      return {
        ...state,
        isJoinRequestPending: false, // Reset the flag
        // You might want to update other parts of the state as needed
      };

    // Assuming you have another action type to handle the failure of the join request
    case GET_JOIN_REQUESTS:
      return { ...state, joinRequests: action.joinRequests };

    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter((project) => project.id !== action.projectId),
        currentProject: null,
      };

    case GET_USER_PROJECTS:
      return { ...state, userProjects: action.userProjects };
    default:
      return state;
  }
};

export default projectReducer;
