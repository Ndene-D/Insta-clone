import "../css/header.css";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useStateValue } from "../stateProvider";
import { actionTypes } from "../reducer";
import Login from "./Login";
import {
  auth,
  provider,
  signInWithPopup,
  GoogleAuthProvider,
} from "../firebase";

import { Avatar } from "@mui/material";

function Header() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="header">
      <img
        className="header__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png"
        alt=""
      />

      <div className="header__buttons">
        {!user ? (
          <Login />
        ) : (
          <>
            <div className="header__accountInfo">
              <Avatar src={user.photoURL} />
              <h5>{user.displayName}</h5>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
