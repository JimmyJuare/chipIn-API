import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import LandingPage from "./components/LandingPage";
import EditPost from "./components/EditPost";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import CreatePostForm from "./components/CreatePostForm";
import ProjectPage from "./components/ProjectPage";
import ManagePosts from "./components/ManagePosts";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // useEffect(() => {
  //   dispatch(authenticate()).then(() => setIsLoaded(true));
  // }, [dispatch]);

  useEffect(() => {
  let isMounted = true; // track if component is still mounted

  dispatch(authenticate()).then(() => {
    if (isMounted) {
      setIsLoaded(true); // only update if still mounted
    }
  });

  return () => {
    isMounted = false; // cleanup
  };
}, [dispatch]);


  return (
    <>
      <Navigation isLoaded={isLoaded} />
      
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/posts/create">
            <CreatePostForm />
          </Route>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/projects/:project_id">
            <ProjectPage />
          </Route>
          <Route exact path="/posts/current">
            <ManagePosts />
          </Route>
          <Route exact path="/posts/:post_id">
            <EditPost />
          </Route>
          <Route exact path="/posts/:post_id">

          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
