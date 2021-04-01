import React, { useContext, useState } from "react";
import logo from "../../images/8302f84597d24e57aaffa216172e4065.png"
import { NavLink } from "react-router-dom";
import "./NavAdminPage.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { userContext } from "../../App";

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../Login/firebase.config";
function NavAdminPage() {
  const [click, setClick] = useState(false);
  const {loggedInUser, setLoggedInUser,isUserLoggedIn,setIsUserLoggedIn} = useContext(userContext);

  const handleClick = () => setClick(!click);
  const handleSignOut=()=>{
    firebase.auth().signOut().then(() => {
      setLoggedInUser({});
      setIsUserLoggedIn(false);
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <img className="logo-img" src={logo} alt=""/>
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            
         
            {isUserLoggedIn && (
              <li className="nav-item">
                <h5 className="nav-links">{loggedInUser.email}</h5>
              </li>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <FontAwesomeIcon icon={faBars} />
          </div>
        </div>
      </nav>
    </>
  );
}

export default  NavAdminPage;