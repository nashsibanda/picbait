import React from "react";
import PostsIndexItem from "./posts_index_item";
import PostsIndexItemContainer from "./posts_index_item_container";
import { withRouter } from "react-router-dom";

const PostsIndex = props => {
  const { posts, likes } = props;
  if (!posts) {
    return <h1>NO POSTS :(</h1>;
  }
  const postKeys = Object.keys(posts).sort((a, b) => b - a);
  return (
    <div className="posts-index-container">
      <ul className="posts-index">
        {postKeys.map(postId => {
          const post = posts[postId];
          return (
            <PostsIndexItemContainer
              post={post}
              postId={postId}
              key={postId}
              likes={likes[postId]}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default withRouter(PostsIndex);
