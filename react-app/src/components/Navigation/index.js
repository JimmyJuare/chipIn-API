import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";
import SearchBar from "../searchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { faToggleOn } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.session.user);
  const [theme, setTheme] = useState( () =>{ 
     return localStorage.getItem("theme") || "light"; //default to light theme
  }
);

  useEffect(() => {
      let isMounted = true;
      
      if (!isMounted) return;
      document.body.classList.remove("light", "dark");
      document.body.classList.add(theme);
      localStorage.setItem("theme", theme);

    return () => { isMounted = false; };
  }, [theme]);
  return (
    <ul className="navbar">
      <li className="nav-left">
      <FontAwesomeIcon className="burger-icon" icon={faBars} />
        <NavLink exact to="/">
          <img
            alt="logo"
            className="logo"
            src="https://chip-in.s3.us-east-2.amazonaws.com/logo1.png"
          />
        </NavLink>
      </li>
      <ul>
        <SearchBar />
      </ul>
      <li>
      {theme === 'light' ? (
        console.log(`light theme`, theme === 'light'),
        <>
        
          <div className="theme-toggle">
            <span>{`${theme} Theme`}</span>
            <FontAwesomeIcon className='light-theme-icon' icon={faToggleOff} size="2x" onClick={() => setTheme("dark")} />
          </div>
        </>
      ) : (
        console.log(`dark theme`, theme === 'dark'),
        <>
          <div className="theme-toggle-dark">
            <span>Dark Theme</span>
            <FontAwesomeIcon className='dark-theme-icon' icon={faToggleOn} size="2x" onClick={() => setTheme("light")} />
          </div>
        </>
      )}
      </li>
      {isLoaded && user && (
        <>
        

          <li>
            <ProfileButton user={sessionUser} />
          </li>
        </>
      )}
      {!user && (
        <div className="login-and-logout">
          <OpenModalButton
            buttonText="Log In"
            className="login-logout"
            modalComponent={<LoginFormModal />}
          />

          <OpenModalButton
            buttonText="Sign Up"
            className="login-logout"
            modalComponent={<SignupFormModal />}
          />
        </div>
      )}
    </ul>
  );
}

export default Navigation;
