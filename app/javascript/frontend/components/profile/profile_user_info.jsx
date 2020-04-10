import React from "react";

export const ProfileUserInfo = props => {
  const { username, bio, email, id, postCount } = props.user;
  const avatarUrl = "https://i.imgur.com/AjybU6j.jpg";
  return (
    <div className="profile-user-info">
      <section className="avatar">
        <div
          className="container"
          style={{
            backgroundImage: `url(${avatarUrl})`,
          }}
        >
          {/* <img src="https://via.placeholder.com/1280x780.jpg"></img> */}
        </div>
      </section>
      <section className="details">
        <div className="title">
          <span className="username">{username}</span>
          <span className="follow">
            <button>Follow</button>
          </span>
        </div>
        <div className="stats">
          <span className="post-count">
            <strong>{postCount}</strong> posts
          </span>
        </div>
        <div className="bio">{bio}</div>
      </section>
    </div>
  );
};
