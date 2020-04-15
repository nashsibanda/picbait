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
      fetchUsers,
      userId,
      fetchPosts,
      fetchFollowers,
      fetchFollowings,
    } = this.props;
    fetchUsers({ user_id: userId });
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
        {posts && likes && profileUser && (
          <PostsIndex
            posts={posts}
            likes={likes}
            postIds={profileUser.postIds}
            modalClosed={this.loadPageData}
          />
        )}
      </div>
    );
  }
}

export default ProfileShow;
