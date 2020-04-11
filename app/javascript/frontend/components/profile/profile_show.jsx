import React from "react";
import ProfileUserInfo from "./profile_user_info";
import ProfileUserInfoContainer from "./profile_user_info_container";
import PostsIndex from "../posts/posts_index";

class ProfileShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchUser, userId, fetchPosts } = this.props;
    fetchUser(userId);
    fetchPosts(userId);
  }

  render() {
    const { users, userId, posts, ownProfile } = this.props;
    const profileUser = users[userId];
    return (
      <div className="profile-show-container">
        <ProfileUserInfoContainer user={profileUser} ownProfile={ownProfile} />
        <PostsIndex posts={posts} />
      </div>
    );
  }
}

export default ProfileShow;
