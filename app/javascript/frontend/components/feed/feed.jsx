import React from "react";
import PostsIndex from "../posts/posts_index";
import { Link } from "react-router-dom";
import { Waypoint } from "react-waypoint";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
    this.loadPageData = this.loadPageData.bind(this);
  }

  loadPageData() {
    const { page } = this.state;
    this.props.fetchMoreFeedPosts(page);
    this.setState({ page: page + 1 });
  }

  componentDidMount() {
    this.loadPageData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.userId != prevProps.userId) {
      this.props.clearPosts();
      this.setState({ page: 1 }, this.loadPageData);
    }
  }

  componentWillUnmount() {
    this.props.clearPosts();
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
          <>
            <PostsIndex
              posts={posts}
              likes={likes}
              modalClosed={this.loadPageData}
            />
            <Waypoint onEnter={this.loadPageData} />
            {/* <button onClick={this.loadPageData}>MORE POSTS</button> */}
          </>
        )}
      </div>
    );
  }
}

export default Feed;
