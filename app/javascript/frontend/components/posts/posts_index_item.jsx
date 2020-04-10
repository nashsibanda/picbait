import React from "react";
import { Link } from "react-router-dom";
import { makeShortTitle } from "../../util/misc_util";

export const PostsIndexItem = props => {
  const { id, title, description, imageUrl, date } = props.post;
  return (
    <li
      className="posts-index-item"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <Link to={`/posts/${id}`} className="link">
        <div className="overlay">
          <div className="title">{makeShortTitle(title)}</div>
          <div className="date">{makeShortTitle(date)}</div>
        </div>
      </Link>
    </li>
  );
};
