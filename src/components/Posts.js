import React from "react";
import "../css/post.css";
import { Avatar } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Comment from "./Comment";
import db from "../firebase";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  updateDoc,
  doc,
  Timestamp,
  getDoc,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";

import { useStateValue } from "../stateProvider";

function Posts(props) {
  const {
    avatarURL,
    username,
    imageURL,
    caption,
    timestamp,
    comments,
    post_id,
    likes,
  } = props;
  const [{ user }, dispatch] = useStateValue();
  const handleLikeClick = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "post", post_id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.likes.includes(user.uid)) {
        await updateDoc(docRef, {
          likes: arrayRemove(user.uid),
        });
      } else {
        await updateDoc(docRef, {
          likes: [user.uid],
        });
      }
    } else {
      await updateDoc(docRef, {
        likes: [user.uid],
      });
    }
  };

  const handlePostDelete = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "post", post_id);

    await deleteDoc(docRef);
  };
  return (
    <div className="post">
      {/* <img className="post__avatar" src="" alt="" /> */}

      <div className="post__header">
        <div className="post__header--left">
          <Avatar src={avatarURL} />
          <div className="post__avatarInfo">
            <h3>{username}</h3>
            <h6>{new Date(timestamp?.toDate()).toUTCString()}</h6>
          </div>
        </div>
        <div className="post__header--right">
          {user && user.displayName === username ? (
            <IconButton onClick={handlePostDelete}>
              <DeleteIcon />
            </IconButton>
          ) : null}
        </div>
      </div>

      <div className="post__body">
        <img className="post__image" src={imageURL} alt="" />
      </div>

      {/*  image */}
      <div className="post__footer">
        <div className="post__options">
          <div className="post__option">
            {user ? (
              <>
                <IconButton onClick={handleLikeClick}>
                  <FavoriteBorderIcon
                    style={{
                      color:
                        user && likes && likes.includes(user.uid)
                          ? "red"
                          : null,
                    }}
                  />
                </IconButton>
                <h5>{likes ? likes.length : null}</h5>
              </>
            ) : null}
          </div>
        </div>
        <h4 className="post__caption">
          <strong>{username}:</strong> {caption}
        </h4>

        <div className="post__footerComment">
          <Comment comments={comments} post_id={post_id} />
        </div>
      </div>
    </div>
  );
}

export default Posts;
