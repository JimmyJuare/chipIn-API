import React, { useState } from "react";
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

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.session.user);
  const [theme, setTheme] = useState(true);
  if(theme){
    //light theme
    document.body.style.backgroundColor = 'white';
    let elements = document.getElementsByClassName('post-body');
    let titles = document.getElementsByClassName('post-title');
    document.getElementsByClassName('project-bar-header')[0].style.color = 'black';
    for(let i=0; i<titles.length; i++){
      titles[i].style.color = 'black';
    }
    for(let i=0; i<elements.length; i++){
      elements[i].style.color = 'black';
    }
  }else{
    //dark theme
    document.body.style.backgroundColor = '#121212';
    document.body.style.color = 'white';

    let elements = document.getElementsByClassName('post-body');
    let titles = document.getElementsByClassName('post-title');

    document.getElementsByClassName('project-bar-header')[0].style.color = 'white';
    //title
    for(let i=0; i<titles.length; i++){
      titles[i].style.color = 'white';
    }
    //post body
    for(let i=0; i<elements.length; i++){
      elements[i].style.color = 'black';
    }
  }
  return (
    <ul className="navbar">
      <li>
        <NavLink exact to="/"> 
          <img
            className="logo"
            src="https://chip-in.s3.us-east-2.amazonaws.com/logo1.png"
          />
        </NavLink>
      </li>
      <ul>
        <SearchBar />
      </ul>
      
      {isLoaded && user && (
        <>
        {theme ? (
          <FontAwesomeIcon className='light-theme-icon' icon={faToggleOff} size="2x" onClick={()=> setTheme(false)}/>
        ) : (
          <>
          <FontAwesomeIcon className='dark-theme-icon' icon={faToggleOn} size="2x" onClick={()=> setTheme(true)} />
          </>
        )}
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
