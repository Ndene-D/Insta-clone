import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import IconButton from "@mui/material/IconButton";
import "../css/comment.css";
import {
  collection,
  orderBy,
  query,
  onSnapshot,
  updateDoc,
  Timestamp,
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
          username: user.displayName,
          comment: input,
        },
      ],
    });

    setInput("");
  };

  return (
    <div className="comment">
      <div className="comment__body">
        {!comments
          ? null
          : comments.map((comment) => (
              <>
                <div>
                  <h4 className="comment__user">
                    <strong>{comment.username}:</strong> {comment.comment}
                  </h4>
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
