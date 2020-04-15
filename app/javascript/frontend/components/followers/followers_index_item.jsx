import React from "react";
import { Link } from "react-router-dom";
import { makeShortString } from "../../util/misc_util";

export const FollowersIndexItem = props => {
  const { id, slug, avatarUrl, username, bio } = props.user;
  return (
    <li className="followers-index-item">
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
        <div className="mini-bio">{makeShortString(bio, 40)}</div>
      </div>
    </li>
  );
};
