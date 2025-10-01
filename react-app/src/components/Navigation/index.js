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
