import React from "react";
import ProfileUserInfoContainer from "./profile_user_info_container";
import PostsIndex from "../posts/posts_index";
import { Waypoint } from "react-waypoint";
import { LoadingSpinner } from "../ui/loading_spinner";

class ProfileShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
    };
    this.loadPageData = this.loadPageData.bind(this);
    this.loadPosts = this.loadPosts.bind(this);
  }

  loadPosts() {
    const { userId } = this.props;
    const { page } = this.state;
    this.props.fetchUserPosts(userId, page);
    this.setState({ page: page + 1 });
  }

  loadPageData() {
    const {
      fetchUsers,
      userId,
      fetchUserPosts,
      fetchFollowers,
      fetchFollowings,
    } = this.props;
    fetchUsers({ user_id: userId });
    this.loadPosts();
    fetchFollowings(userId);
    fetchFollowers(userId);
  }

  componentDidMount() {
    this.loadPageData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.userId != prevProps.userId) {
      this.props.clearPosts();
      this.setState({ page: 1 }, this.loadPageData);
    }
  }

  componentWillUnmount() {
    this.props.clearPosts();
  }

  render() {
    const {
      users,
      userId,
      posts,
      ownProfile,
      likes,
      followers,
      following,
      loading,
    } = this.props;
    const profileUser = users[userId];
    return (
      <div className="profile-show-container">
        {profileUser && (
          <ProfileUserInfoContainer
            user={profileUser}
            ownProfile={ownProfile}
          />
        )}
        {posts && likes && profileUser && (
          <>
            <PostsIndex
              posts={posts}
              likes={likes}
              modalClosed={this.loadPageData}
            />
            {loading.postPage && <LoadingSpinner className="inline-padding" />}
            <Waypoint onEnter={this.loadPosts} />
          </>
        )}
      </div>
    );
  }
}

export default ProfileShow;
