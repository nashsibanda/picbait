import React from "react";
import PostsIndex from "../posts/posts_index";
import { Link } from "react-router-dom";
import { Waypoint } from "react-waypoint";
import { LoadingSpinner } from "../ui/loading_spinner";

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
    const { users, userId, posts, likes, loading } = this.props;
    const profileUser = users[userId];
    return (
      <div className="feed-container">
        <div className="feed-header">
          <h2>
            <i className="fas fa-th"></i>
            latest posts
          </h2>
        </div>
        {posts && likes && profileUser && (
          <>
            <PostsIndex
              posts={posts}
              likes={likes}
              modalClosed={this.loadPageData}
              type={"feed"}
            />
            {loading.postPage && <LoadingSpinner />}
            <Waypoint onEnter={this.loadPageData} />
          </>
        )}
      </div>
    );
  }
}

export default Feed;
