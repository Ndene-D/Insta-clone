import "./css/App.css";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Button from "@mui/material/Button";
import db, {
  auth,
  provider,
  signInWithPopup,
  GoogleAuthProvider,
} from "./firebase";

import {
  collection,
  orderBy,
  query,
  onSnapshot,
  addDoc,
  Timestamp,
} from "firebase/firestore";

import { useStateValue } from "./stateProvider";

function App() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [posts, setPosts] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    const q = query(collection(db, "post"), orderBy("timestamp", "desc"));
    const docs = onSnapshot(q, (snapshot) => {
      setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
    });
  }, []);

  const handlePostButton = async () => {
    await addDoc(collection(db, "post", ""), {
      username: user.displayName,
      avatarURL: user.photoURL,
      imageURL: image,
      caption: caption,
      timestamp: Timestamp.now(),
      comments: [],
      likes: [],
    });

    setImage("");
    setCaption("");
  };
  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>

      <div className="app__body">
        {!user ? null : (
          <>
            <div className="app__bodyBottom">
              <input
                value={image}
                type="text"
                placeholder="insert image URL"
                onChange={(e) => setImage(e.target.value)}
              />
              <input
                value={caption}
                type="text"
                placeholder="Add Caption here"
                onChange={(e) => setCaption(e.target.value)}
              />
              <Button type="submit" onClick={handlePostButton}>
                Post
              </Button>
            </div>
          </>
        )}
        {posts.map((post) => (
          <Posts
            key={post.id}
            avatarURL={post.data.avatarURL}
            username={post.data.username}
            timestamp={post.data.timestamp}
            caption={post.data.caption}
            imageURL={post.data.imageURL}
            comments={post.data.comments}
            post_id={post.id}
            likes={post.data.likes}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
