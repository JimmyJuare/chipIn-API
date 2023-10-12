import React, { useEffect } from "react";
import * as postStore from "../../store/posts";
import * as projectStore from "../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditPost from '../EditPost'
import { Link } from "react-router-dom/";
import "./index.css";
import { useParams } from "react-router-dom";
import DeletePost from "../DeletePost";
import ProjectBar from "../ProjectBar";
function LandingPage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts?.posts);
  const test = useSelector((state) => state);
  console.log('this is the test', test);
  const user = useSelector(state => state.session.user)
  const res = Array.isArray(posts) ? posts.filter(post => post.status === "Published") : [];
  console.log('this is the session', user);
  const { post_id } = useParams();
  console.log('this is this post id'. post_id);
  console.log("these are the posts", posts);
  useEffect(() => {
    dispatch(postStore.getPostsThunk());
    dispatch(projectStore.fetchProjects())
  }, [dispatch]);
  if (!posts || posts.length === 0) {
    return <div>Loading...</div>; // Display a loading state until spots are fetched
  }
  return (
    <>
    <div className="wrapper">
      <ProjectBar />

      <div className="post-wrapper">
        {res?.length > 0 && (
          <>
          <Link to='posts/create'>
                <button>Create Post</button>
          </Link>
            {res.map((post, i) => (
              <div className="post">
                <div className="post-top">
                  <p className="title">{post.title}</p>
                  {user.id === post.user_id && (
                  <div>
                    <OpenModalButton
                      className="edit-button"
                      buttonText="Edit Post"
                      modalComponent={<EditPost post_id={post.id}/>}
                    ></OpenModalButton>
                    <OpenModalButton
                      className=""
                      buttonText="Delete Post"
                      modalComponent={<DeletePost post_id={post.id}/>}
                    ></OpenModalButton>
                  </div>
                  )}
                </div>
                <p>{post.body}</p>
    
              </div>
            ))}
          </>
        )}
      </div>
    </div>
    </>
  );
}

export default LandingPage;