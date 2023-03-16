import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/dashboard.css";

const Dashboard = () => {
  const [content, setContent] = useState("");
  const [post, setPost] = useState([]);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:2000/dashboard")
      .then((res) => {
        const post = [];
        if (!res.data.message) {
          window.localStorage.setItem("loggedIn", false);
          // setIsLoggedin(false);
          console.log("exp", res.data);
          return;
        }
        setUserId(res.data.getUser._id);
        const filtered = Object.values(res.data.getPost);
        post.push(
          ...filtered.filter((data) => res.data.getUser._id == data.user._id)
        );
        setPost(post);
      })
      .catch((err) => console.log("err", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:2000/dashboard/post", {
        content,
        userId,
      })
      .then((res) => console.log(res.data));
  };

  const handleDelete = (id) => {
    console.log("iddd", id);
    axios
      .post(`http://localhost:2000/post/${id}`)
      .then((res) => {
        if (res.data.message) {
          console.log("gfffggf", res.data);
          const filtered = Object.values(res.data.getPost);
          post.push(...filtered.filter((data) => userId == data.user._id));
          setPost(post);
        }
      })
      .catch((err) => console.log(" new errr", err));
  };

  return (
    <div className="main">
      <div id="form-box">
        <div id="form-inner">
          <div id="my-img">
            <img src="" alt="" />
          </div>
          <div id="main-form">
            <form onSubmit={handleSubmit} id="post-form">
              <textarea
                id="textarea"
                type="text"
                name="content"
                placeholder="Whats's on your mind,"
                required
                cols="50"
                rows="1"
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <input id="post-btn" type="submit" value="Post" />
            </form>
          </div>
        </div>
        <hr />
        <div id="add-status">
          <div id="inner-status">
            <div className="status-box">
              <div className="status-logo">
                <img src="" />
              </div>
              <div className="status-text">
                <span>Live video</span>
              </div>
            </div>
            <div className="status-box">
              <div className="status-logo">
                <img src="" />
              </div>
              <div className="status-text">
                <span>Photo/video</span>
              </div>
            </div>
            <div className="status-box">
              <div className="status-logo">
                <img src="" />
              </div>
              <div className="status-text">
                <span>Feeling/activity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="post-box">
        {post.map((data, index) => {
          return (
            <div className="post" key={index} id={`post-${data._id}`}>
              <div className="header">
                <div className="header-name">
                  <h3>
                    {data.user.name} <span>posted a status</span>
                  </h3>
                </div>
                <div className="header-close">
                  <p onClick={() => handleDelete(data._id)}>x</p>
                </div>
              </div>
              <div className="header-content">
                <p>{data.content}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export { Dashboard };
