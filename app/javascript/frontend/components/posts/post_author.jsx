import React from "react";

export const PostAuthor = props => {
  const { id, slug, avatarUrl, username } = props.author;
  console.log(props.author);
  return (
    <div className="post-author">
      <div className="avatar">
        <div
          className="container"
          style={{
            backgroundImage: `url(${avatarUrl})`,
          }}
        ></div>
      </div>
      <div className="details">
        <div className="username">{username}</div>
        <div className="location">Bournemouth, England</div>
      </div>
    </div>
  );
};
