import React from "react";
import { Link } from "react-router-dom";

export const PostAuthor = props => {
  const { id, slug, avatarUrl, username } = props.author;
  return (
    <div className="post-author">
      <div className="avatar">
        <Link to={`/users/${slug}`}>
          <button
            type="button"
            className="container"
            style={{
              backgroundImage: `url(${avatarUrl})`,
            }}
          ></button>
        </Link>
      </div>
      <div className="details">
        <div className="username">
          <Link to={`/users/${slug}`}>{username}</Link>
        </div>
        <div className="location">Bournemouth, England</div>
      </div>
    </div>
  );
};
