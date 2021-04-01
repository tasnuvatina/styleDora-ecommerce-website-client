import React, { useContext, useRef, useState } from "react";
import { userContext } from "../../App";
import { useHistory, useLocation } from "react-router";

import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

import "./Login.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faGithub,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';

const Login = () => {
  let history = useHistory();
  let location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  let [newUser, setNewUser] = useState(false);
  let {
    loggedInUser,
    setLoggedInUser,
    isUserLoggedIn,
    setIsUserLoggedIn,
  } = useContext(userContext);
  const [error, setError] = useState("");
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  let handleGoogleSignIn = () => {
    let googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        const { displayName, email } = user;
        const signedInUser = { name: displayName, email };
        setLoggedInUser(signedInUser);
        setIsUserLoggedIn(true);
        history.replace(from);
        setError("");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        setError(errorMessage);
      });
  };

  let handleFacebookSignIn = () => {
    var facebookProvider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(facebookProvider)
      .then((result) => {
        var credential = result.credential;
        var user = result.user;
        var accessToken = credential.accessToken;
        const { displayName, email } = user;
        const signedInUser = { name: displayName, email };
        setLoggedInUser(signedInUser);
        setIsUserLoggedIn(true);
        history.replace(from);
        setError("");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        setError(errorMessage);
      });
  };
  let handleBlur = (e) => {
    e.preventDefault();
    let isFormValid;
    if (newUser) {
      if (nameRef.current.value > 5) {
        isFormValid = true;
      }
    }
    if (/\S+@\S+\.\S+/.test(emailRef.current.value)) {
      isFormValid = true;
    }
    if (passwordRef.current.value > 6 && /\d/.test(passwordRef.current.value)) {
      isFormValid = true;
    }
    if (newUser) {
      if (passwordRef.current.value === passwordConfirmRef.current.value) {
        isFormValid = true;
      }
    }
    if (isFormValid === true) {
      let nUser = {};
      if (newUser) {
        nUser.name = nameRef.current.value;
      }
      nUser.email = emailRef.current.value;
      nUser.password = passwordRef.current.value;
      setLoggedInUser(nUser);
    }
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    if (newUser && loggedInUser.email && loggedInUser.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          loggedInUser.email,
          loggedInUser.password
        )
        .then((userCredential) => {
          var user = userCredential.user;
          updateUserInfo(user.name);
          const { displayName, email } = user;
          const signedInUser = { name: displayName, email };
          setLoggedInUser(signedInUser);
          setIsUserLoggedIn(true);
          console.log(loggedInUser);
          history.replace(from);
          setError("");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          setError(errorMessage);
        });
    }

    if (!newUser && loggedInUser.email && loggedInUser.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(loggedInUser.email, loggedInUser.password)
        .then((userCredential) => {
          var user = userCredential.user;
          const { displayName, email } = user;
          const signedInUser = { name: displayName, email };
          setLoggedInUser(signedInUser);
          setIsUserLoggedIn(true);
          console.log(loggedInUser);
          history.replace(from);
          setError("");
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          setError(errorMessage);
        });
    }
  };
  let updateUserInfo = (name) => {
    const user = firebase.auth().currentUser;

    user
      .updateProfile({
        displayName: name,
      })
      .then(function () {
        console.log("user name updated");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="login">
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-2">
                {newUser ? "Register" : "Log In"}
              </h2>
              {error && <p className="error">{error}</p>}
              <Form onSubmit={handleSubmit}>
                {newUser && (
                  <Form.Group id="name" className="my-4">
                    <Form.Control
                      type="text"
                      ref={nameRef}
                      placeholder="Name"
                      onBlur={handleBlur}
                      required
                    ></Form.Control>
                  </Form.Group>
                )}
                <Form.Group id="email" className="my-4">
                  <Form.Control
                    type="email"
                    ref={emailRef}
                    placeholder="Email"
                    onBlur={handleBlur}
                    required
                  />
                </Form.Group>
                <Form.Group id="password" className="my-4">
                  <Form.Control
                    type="password"
                    ref={passwordRef}
                    placeholder="Password"
                    onBlur={handleBlur}
                    required
                  />
                </Form.Group>
                {newUser && (
                  <Form.Group id="password-confirm" className="my-4">
                    <Form.Control
                      type="password"
                      ref={passwordConfirmRef}
                      placeholder="Password Confirmation"
                      onBlur={handleBlur}
                      required
                    />
                  </Form.Group>
                )}
                <button className="w-100 mb-4 form-button" type="submit">
                  {newUser ? "Register" : "Log In"}
                </button>
              </Form>
              {newUser ? (
                <div className="w-100 text-center mt-2">
                  Already have an account ?{" "}
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setNewUser(!newUser);
                    }}
                  >
                    Log In
                  </a>
                </div>
              ) : (
                <div className="w-100 text-center mt-2">
                  Don't have an account ?{" "}
                  <a
                    href=""
                    onClick={(e) => {
                      e.preventDefault();
                      setNewUser(!newUser);
                    }}
                  >
                    Register
                  </a>
                </div>
              )}
            </Card.Body>
          </Card>
          <a className="icon google" href="#" onClick={handleGoogleSignIn}>
            <FontAwesomeIcon icon={faGoogle} />
          </a>
          <a className="icon facebook" href="#" onClick={handleFacebookSignIn}>
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
        </div>
      </Container>
    </div>
  );
};

export default Login;