import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import OpenModalButton from "../OpenModalButton";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const user = useSelector((state) => state.session.user);


  return (
    <ul className="navbar">
      <li>
        <NavLink exact to="/">
		<img className="logo" src='https://chip-in.s3.us-east-2.amazonaws.com/logo1.png' />
        </NavLink>
      </li>
      {isLoaded && user &&(
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
      {!user &&(
			<>
			  <OpenModalButton
				buttonText="Log In"
				className=''
				modalComponent={<LoginFormModal />}
			  />
  
			  <OpenModalButton
				buttonText="Sign Up"
				modalComponent={<SignupFormModal />}
			  />
			</>
		  
      )}
    </ul>
  );
}

export default Navigation;
