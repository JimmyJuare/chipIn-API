import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { faToggleOn } from "@fortawesome/free-solid-svg-icons";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };


  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);


  const [theme, setTheme] = useState(() => {
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
    <>
      <button id="user-logo-button" onClick={openMenu}>
        <FontAwesomeIcon icon={faCircleUser} id="user-logo" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user && (
          <div id="profile-data">
            <li>{user.username}'s settings</li>
            <li>
              <button id="logout-button" onClick={handleLogout}>Log Out</button>
            </li>
            <li>
              {theme === 'light' ? (
                console.log(`light theme`, theme === 'light'),
                <>

                  <div className="theme-toggle">
                    <span>Light Theme</span>
                    <FontAwesomeIcon className='light-theme-icon' icon={faToggleOff} size="2x" onClick={() => setTheme("dark")} />
                  </div>
                </>
              ) : (
                console.log(`dark theme`, theme === 'dark'),
                <>
                  <div className="theme-toggle" id="theme-toggle-dark">
                    <span>Dark Theme</span>
                    <FontAwesomeIcon className='dark-theme-icon' icon={faToggleOn} size="2x" onClick={() => setTheme("light")} />
                  </div>
                </>
              )}
            </li>
          </div>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
