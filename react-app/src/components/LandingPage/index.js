import React, { useEffect } from "react";
import * as postStore from "../../store/posts";
import * as projectStore from "../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import EditPost from "../EditPost";
import { Link } from "react-router-dom/";
import "./index.css";
import { useParams } from "react-router-dom";
import DeletePost from "../DeletePost";
import ProjectBar from "../ProjectBar";
function LandingPage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts?.posts || []);
  const test = useSelector((state) => state);
  const user = useSelector((state) => state.session.user);
  const res = Array.isArray(posts)
    ? posts.filter((post) => post.status === "Published")
    : [];
  const { post_id } = useParams();
  console.log("this is res", res?.length);
  console.log("this is posts", posts);
  useEffect(() => {
    dispatch(postStore.getPostsThunk());
    dispatch(projectStore.fetchProjects());
  }, [dispatch]);

  if (!posts || posts.length === 0) {
    return <div>Loading...</div>; // Display a loading state until spots are fetched
  }
  return (
    <>
      <div className="wrapper">
        {user && (
          <>
            <ProjectBar />
          </>
        )}

        <div className="post-wrapper">
          <div className="banner">
            <p className="banner-text">
              <h3>Welcome to <span className="website-name">ChipIn</span></h3>
              <br></br>
              the ultimate hub for global
              collaboration and project innovation. Say goodbye to the struggles
              of finding partners on scattered Discord servers. Our platform is
              tailored for passionate individuals seeking to turn ideas into
              reality. Whether you're an entrepreneur, developer, artist, or
              visionary, <span className="website-name">ChipIn</span> provides a centralized space to
              share projects and connect with like-minded creators. No more
              begging for help; showcase your ideas, attract a dedicated team,
              and contribute to others' projects. 
              <br></br>
              Join us in this vibrant
              community where collective creativity thrives, and together, let's
              build something extraordinary!
            </p>
          </div>
          <h3>Posts</h3>
          {res?.length > 0 && (
            <>
              {res.reverse().map((post, i) => (
                <div className="post">
                  <div className="post-top">
                    <p className="title">{post.title}</p>
                  </div>
                  <p className="body">{post.body}</p>
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
