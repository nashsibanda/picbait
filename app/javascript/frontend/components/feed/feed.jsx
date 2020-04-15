import React from "react";
import PostsIndex from "../posts/posts_index";
import { Link } from "react-router-dom";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.loadPageData = this.loadPageData.bind(this);
  }

  loadPageData() {
    const { fetchFeedPosts } = this.props;
    fetchFeedPosts();
  }

  componentDidMount() {
    this.loadPageData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userId != prevProps.userId) {
      this.loadPageData();
    }
  }

  render() {
    const { users, userId, posts, likes } = this.props;
    const profileUser = users[userId];
    return (
      <div className="feed-container">
        <div className="feed-header">
          <h2>
            <Link to={`users/${profileUser.slug}`}>{profileUser.username}</Link>
            's feed
          </h2>
        </div>
        {posts && likes && profileUser && (
          <PostsIndex
            posts={posts}
            likes={likes}
            modalClosed={this.loadPageData}
          />
        )}
      </div>
    );
  }
}

export default Feed;
