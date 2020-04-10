import React from "react";

export const ProfileUserInfo = props => {
  const { username, bio, email, id, postCount } = props.user;
  return (
    <div className="profile-user-info">
      <section className="profile-avatar">
        <img src="https://via.placeholder.com/1280x780.jpg"></img>
      </section>
      <section className="profile-details">
        <div className="profile-title">
          <span className="profile-username">{username}</span>
          <span className="profile-email">{email}</span>
        </div>
        <div className="profile-stats">
          <span className="profile-post-count">{postCount} posts</span>
        </div>
        <div className="profile-bio">{bio}</div>
      </section>
    </div>
  );
};
