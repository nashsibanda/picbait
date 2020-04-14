import React from "react";
import ProfileUserInfoContainer from "./profile_user_info_container";
import PostsIndex from "../posts/posts_index";

class ProfileShow extends React.Component {
  constructor(props) {
    super(props);
    this.loadPageData = this.loadPageData.bind(this);
  }

  loadPageData() {
    const {
      fetchUser,
      userId,
      fetchPosts,
      fetchFollowers,
      fetchFollowings,
    } = this.props;
    fetchUser(userId);
    fetchPosts(userId);
    fetchFollowings(userId);
    fetchFollowers(userId);
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
    const {
      users,
      userId,
      posts,
      ownProfile,
      likes,
      followers,
      following,
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
        {posts && likes && <PostsIndex posts={posts} likes={likes} />}
      </div>
    );
  }
}

export default ProfileShow;
