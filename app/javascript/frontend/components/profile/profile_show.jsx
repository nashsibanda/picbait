import React from "react";
import { ProfileUserInfo } from "./profile_user_info";
import { PostsIndex } from "../posts/posts_index";

class ProfileShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { fetchUser, userId, fetchPosts } = this.props;
    fetchUser(userId);
    fetchPosts(userId);
  }

  render() {
    const { users, userId, posts } = this.props;
    const profileUser = users[userId];
    return (
      <div className="profile-show-container">
        <ProfileUserInfo user={profileUser} />
        <PostsIndex posts={posts} />
      </div>
    );
  }
}

export default ProfileShow;
