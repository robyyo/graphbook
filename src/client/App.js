import React, { useState } from "react";
import { Helmet } from "react-helmet";
import "../../assets/css/style.css";

const App = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [postContent, setPostContent] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("test");
    const newPost = {
      id: posts.length + 1,
      text: postContent,
      user: {
        avatar: "/uploads/avatar1.png",
        username: "Fake User",
      },
    };
    setPosts([newPost, ...posts]);
    setPostContent("");
  };
  return (
    <div className="container">
      <Helmet>
        <title>
          Graphbook - Feed
        </title>
          <meta name="description" content="Newsfeed of all your friends on Graphbook"/>
      </Helmet>
      <div className="postForm">
        <form onSubmit={handleSubmit}>
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Write your custom post!"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
      <div className="feed">
        {posts.map((post, i) => (
          <div key={post.id} className="post">
            <div className="header">
              <img src={post.user.avatar} alt="user avatar" />
              <h2>{post.user.username}</h2>
            </div>
            <p className="content">{post.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
