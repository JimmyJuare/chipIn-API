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
export default function ManagePosts() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts?.posts || []);
  const test = useSelector((state) => state);
  const user = useSelector((state) => state.session.user);
  const res = Array.isArray(posts)
    ? posts.filter((post) => post.status === "Published" && post.user_id === user.id)
    : [];
  const { post_id } = useParams();
  useEffect(() => {
    dispatch(postStore.getPostsThunk());
  }, [dispatch]); 
  if (!posts || posts.length === 0) {
    return <div>Loading...</div>; // Display a loading state until spots are fetched
  }
  return (
    <>
      <div className="wrapper">
        <h2 className="post-header">my posts</h2>
        <div className="post-wrapper">
          {res?.length > 0 && (
            <>
              {res.map((post, i) => (
                <div className="post">
                  <div className="post-top">
                    <p className="title">{post.title}</p>
                    {user && user.id === post.user_id && (
                      <div>
                        <Link to={`posts/${post.id}`}>
                          <OpenModalButton
                            className="edit-button"
                            buttonText="Edit Post"
                            modalComponent={<EditPost post_id={post.id} />}
                          ></OpenModalButton>
                        </Link>
                        <OpenModalButton
                          className=""
                          buttonText="Delete Post"
                          modalComponent={<DeletePost post_id={post.id} />}
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
