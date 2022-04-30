import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar } from "@mui/material";
import "../css/comment.css";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  updateDoc,
  Timestamp,
  arrayRemove,
  doc,
} from "firebase/firestore";

import db from "../firebase";

import { useStateValue } from "../stateProvider";

function Comment(props) {
  const { comments, post_id } = props;
  const [{ user }, dispatch] = useStateValue();
  const [input, setInput] = useState("");
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "post", post_id);
    await updateDoc(docRef, {
      comments: [
        {
          avatarURL: user.photoURL,
          username: user.displayName,
          comment: input,
        },
      ],
    });

    setInput("");
  };

  const handleCommentDelete = async (e, avatar, username, comment) => {
    e.preventDefault();
    const docRef = doc(db, "post", post_id);
    await updateDoc(docRef, {
      comments: arrayRemove({
        avatarURL: avatar,
        username: username,
        comment: comment,
      }),
    });
  };

  return (
    <div className="comment">
      <div className="comment__body">
        {!comments
          ? null
          : comments.map((comment) => (
              <>
                <div className="comment__item">
                  <div className="comment__item--left">
                    <Avatar src={comment.avatarURL} />
                    <h4 className="comment__user" key={post_id}>
                      <strong>{comment.username}:</strong> {comment.comment}
                    </h4>
                  </div>
                  {user && user.displayName === comment.username ? (
                    <div className="comment__item--right">
                      <IconButton
                        onClick={(e) =>
                          handleCommentDelete(
                            e,
                            comment.avatarURL,
                            comment.username,
                            comment.comment
                          )
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ) : null}
                </div>
              </>
            ))}
      </div>

      {!user ? null : (
        <div className="comment__field">
          <input
            value={input}
            type="text"
            placeholder=" Add a comment"
            onChange={(e) => setInput(e.target.value)}
          />
          <IconButton onClick={handleCommentSubmit}>
            <SendIcon />
          </IconButton>
        </div>
      )}
    </div>
  );
}

export default Comment;
