const GET_POSTS = "posts/GET_POSTS";
const GET_ONE_POST = "posts/GET_ONE_POST";
const ADD_POST = "posts/ADD_POST";
const EDIT_POST = "posts/EDIT_POST";
const DELETE_POST = "messages/DELETE_POST";
const GET_USER_POSTS = "posts/GET_USER_POSTS";

const getPosts = (posts) => ({
  type: GET_POSTS,
  posts,
});

const getOnePost = (post) => ({
  type: GET_ONE_POST,
  post,
});

export const addPost = (post) => ({
  type: ADD_POST,
  post,
});

export const editPost = (post) => ({
  type: EDIT_POST,
  post,
});

export const deletePost = (postId) => ({
  type: DELETE_POST,
  postId, // Pass the postId directly instead of an object
});
const getUserPosts = (posts) => ({
  type: GET_USER_POSTS,
  posts,
});

export const getPostsThunk = () => async (dispatch) => {
  const res = await fetch(`/api/posts`);
  const data = await res.json();
  dispatch(getPosts(data));
  return data;
};

export const getOnePostThunk = (postId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/posts/${postId}`);
    if (response.ok) {
      const post = await response.json();
      dispatch(getOnePost(post));
    } else {
      console.error("Error occurred:", response);
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

export const deletePostThunk = (postId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(deletePost(postId));
    } else {
      console.error("Error occurred:", response);
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
};

export const editPostThunk = (post_id, data) => async (dispatch) => {
  try {
    console.log("Editing post...");
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const updatedPost = await response.json();
      console.log("this is the updated post", updatedPost);
      dispatch(editPost(updatedPost));
    } else {
      console.error("Error occurred:", response);
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
export const addPostThunk = (postData, newImage) => async (dispatch) => {
  console.log("this is the post data", postData);
  try {
    let res;
    if (newImage) {
      res = await fetch("/api/posts/create", {
        method: "POST",
        body: postData,
      });
    } else {
      console.log("hitting the thunk");
      res = await fetch("/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
    }

    if (res.ok) {
      const newPost = await res.json();
      dispatch(addPost(newPost));
      return newPost;
    } else {
      console.error("Error occurred:", res);
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
export const getUserPostsThunk = (userId) => async (dispatch) => {
  try {
    const response = await fetch(`/api/posts/user/${userId}`);
    if (response.ok) {
      const userPosts = await response.json();
      dispatch(getUserPosts(userPosts));
    } else {
      console.error("Error fetching user posts:", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching user posts:", error);
  }
};

const initialState = {
  posts: [],
  currentPost: null, // Added a new key to store the current post being edited
};

const postsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case GET_ONE_POST:
      return {
        ...state,
        currentPost: action.post, // Set currentPost for the single post
      };
    case DELETE_POST:
      newState = { ...state };
      newState.posts = newState.posts.filter(
        (post) => post.id !== action.postId // Use action.postId here
      );
      return newState;
    case EDIT_POST:
      newState = { ...state };
      newState.posts = newState.posts.map((post) =>
        post.id === action.post.id ? action.post : post
      );
      return newState;
    case ADD_POST:
      newState = { ...state };
      newState.posts = [...state.posts, action.post];
      return newState;
    case GET_USER_POSTS:
      return {
        ...state,
        userPosts: action.posts,
      };
    default:
      return state;
  }
};

export default postsReducer;
