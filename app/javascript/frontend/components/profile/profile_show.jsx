import React from "react";
import ProfileUserInfoContainer from "./profile_user_info_container";
import PostsIndex from "../posts/posts_index";

class ProfileShow extends React.Component {
  constructor(props) {
    super(props);
    this.loadPageData = this.loadPageData.bind(this);
  }

  loadPageData() {
    const { fetchUser, userId, fetchPosts } = this.props;
    fetchUser(userId);
    fetchPosts(userId);
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
    const { users, userId, posts, ownProfile } = this.props;
    const profileUser = users[userId];
    return (
      <div className="profile-show-container">
        {profileUser && (
          <ProfileUserInfoContainer
            user={profileUser}
            ownProfile={ownProfile}
          />
        )}
        {posts && <PostsIndex posts={posts} />}
      </div>
    );
  }
}

export default ProfileShow;
