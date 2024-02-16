import React, { useEffect } from "react";
import * as postStore from "../../store/posts";
import * as projectStore from "../../store/projects";
import { useDispatch, useSelector } from "react-redux";
import "./index.css";
import ProjectBar from "../ProjectBar";
function LandingPage() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts?.posts || []);
  const joinRequest = useSelector(
    (state) => state.projects?.joinRequests?.join_requests || []
  );
  const user = useSelector((state) => state.session.user);
  const PublishedArray = Array.isArray(posts)
    ? posts.filter((post) => post.status === "Published")
    : [];


  useEffect(() => {
    dispatch(postStore.getPostsThunk());
    dispatch(projectStore.fetchProjects());
    dispatch(projectStore.fetchJoinRequests(user?.id));
  }, [dispatch]);

  if (!posts || posts.length === 0) {
    return <div>Loading...</div>; // Display a loading state until spots are fetched
  }
  const handleJoinRequest = async (project_id) => {
    await dispatch(projectStore.requestToJoinProject(project_id));
    await dispatch(projectStore.fetchJoinRequests(user?.id));
  };
  return (
    <>
      <div className="wrapper">
        {user && (
          <>
            <ProjectBar />
          </>
        )}

        <div className="post-wrapper">
          {!user && (
            <div className="banner">
              <p className="banner-text">
                the ultimate hub for global collaboration and project
                innovation. Say goodbye to the struggles of finding partners on
                scattered Discord servers. Our platform is tailored for
                passionate individuals seeking to turn ideas into reality.
                Whether you're an entrepreneur, developer, artist, or visionary,{" "}
                <span className="website-name">ChipIn</span> provides a
                centralized space to share projects and connect with like-minded
                creators. No more begging for help; showcase your ideas, attract
                a dedicated team, and contribute to others' projects.
                <br></br>
                Join us in this vibrant community where collective creativity
                thrives, and together, let's build something extraordinary!
              </p>
            </div>
          )}
          <h3 className="post-header">Posts</h3>
          {PublishedArray?.length > 0 && (
            <>
              {PublishedArray.reverse().map((post, i) => (
                <div key={post.id} className="post">
                  <div className="post-title">
                    <p className="title">{post.title}</p>
                  </div>
                  <div className="post-content">
                    <p className="post-body">{post.body}</p>
                    {user && user.id !== post.user_id && (
                      <>
                        {joinRequest.some(
                          (request) => request.project_id === post.project_id
                        ) ? (
                          <button className="sent-req-button" disabled>
                            Request Sent
                          </button>
                        ) : (
                          <button
                            className="req-button"
                            onClick={() => handleJoinRequest(post.project_id)}
                          >
                            Request
                          </button>
                        )}
                      </>
                    )}
                  </div>
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
