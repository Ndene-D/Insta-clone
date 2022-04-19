import React from "react";
import Button from "@mui/material/Button";
import { useStateValue } from "../stateProvider";
import { actionTypes } from "../reducer";
import "../css/login.css";

import {
  auth,
  provider,
  signInWithPopup,
  GoogleAuthProvider,
} from "../firebase";

function Login() {
  const [state, dispatch] = useStateValue();
  const handleSignIn = async (e) => {
    e.preventDefault();
    signInWithPopup(auth, provider)
      .then((results) => {
        const credential = GoogleAuthProvider.credentialFromResult(results);
        const token = credential.accessToken;
        const user = results.user;

        console.log(user);
        dispatch({
          type: actionTypes.SET_USER,
          user: results.user,
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        console.log({ errorCode, errorMessage, email });
      });
  };
  return (
    <Button onClick={handleSignIn}>
      <img
        className="login__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1024px-Google_%22G%22_Logo.svg.png"
        width="24"
      />
      Sign-in
    </Button>
  );
}

export default Login;
