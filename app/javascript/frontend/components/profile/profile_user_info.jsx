import React from "react";
import { makeFilename } from "../../util/misc_util";
import FollowersIndexContainer from "./../followers/followers_index_container";

class ProfileUserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newAvatarUrl: "",
      newAvatarFile: null,
      followerCount: Object.keys(this.props.followers).length,
      followingCount: Object.keys(this.props.following).length,
      showFollowers: false,
      showFollowing: false,
    };
    this.handleNewAvatar = this.handleNewAvatar.bind(this);
    this.submitNewAvatar = this.submitNewAvatar.bind(this);
    this.clearNewAvatar = this.clearNewAvatar.bind(this);
    this.toggleFollow = this.toggleFollow.bind(this);
    this.toggleFollowingIndex = this.toggleFollowingIndex.bind(this);
    this.toggleFollowersIndex = this.toggleFollowersIndex.bind(this);
  }

  // componentDidMount() {
  //   this.props.fetchUsers({ user_id: this.props.user.slug });
  // }

  toggleFollowersIndex(e) {
    this.setState({
      showFollowers: !this.state.showFollowers,
      showFollowing: false,
    });
  }

  toggleFollowingIndex(e) {
    this.setState({
      showFollowing: !this.state.showFollowing,
      showFollowers: false,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.followers != prevProps.followers) {
      this.setState({
        followerCount: Object.keys(this.props.followers).length,
      });
    }
    if (this.props.following != prevProps.following) {
      this.setState({
        followingCount: Object.keys(this.props.following).length,
      });
    }
    if (this.props.user != prevProps.user) {
      this.setState({ showFollowing: false, showFollowers: false });
    }
  }

  clearNewAvatar(e) {
    e.preventDefault();
    this.setState({ newAvatarUrl: "", newAvatarFile: null });
    this.avatarInput.value = "";
  }

  handleNewAvatar(e) {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () =>
      this.setState({ newAvatarUrl: reader.result, newAvatarFile: file });

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({ newAvatarUrl: "", newAvatarFile: null });
    }
  }

  submitNewAvatar(e) {
    e.preventDefault();
    const formUser = new FormData();
    const { newAvatarFile } = this.state;
    const { slug } = this.props.user;
    formUser.append(
      "user[avatar]",
      newAvatarFile,
      makeFilename(newAvatarFile.name)
    );
    console.log(formUser);
    this.props.updateUser(slug, formUser);
    this.setState({ newAvatarUrl: "", newAvatarFile: null });
  }

  toggleFollow(e) {
    const { followStatus, createFollow, deleteFollow, user } = this.props;
    const { id } = user;
    if (followStatus) {
      deleteFollow(id);
    } else {
      createFollow(id);
    }
  }

  render() {
    const {
      ownProfile,
      followStatus,
      user,
      followers,
      following,
      users,
    } = this.props;
    const { username, bio, postCount, avatarUrl } = this.props.user;
    const {
      newAvatarUrl,
      followerCount,
      followingCount,
      showFollowers,
      showFollowing,
    } = this.state;
    return (
      <div className="profile-user-info">
        <section className="avatar">
          <div
            className="container"
            style={{
              backgroundImage: `url(${
                newAvatarUrl ? newAvatarUrl : avatarUrl
              })`,
            }}
          >
            {ownProfile && (
              <>
                <input
                  type="file"
                  onChange={this.handleNewAvatar}
                  id="edit-avatar-input"
                  ref={el => (this.avatarInput = el)}
                ></input>
                <label
                  className="fas fa-camera edit-avatar-icon"
                  htmlFor="edit-avatar-input"
                ></label>
                {newAvatarUrl && (
                  <form
                    onSubmit={this.submitNewAvatar}
                    className="edit-avatar-form"
                  >
                    <button type="submit" className="submit-button">
                      <i className="fas fa-save"></i> Save
                    </button>
                    <button
                      type="button"
                      className="close-button"
                      onClick={this.clearNewAvatar}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </section>
        <section className="details">
          <div className="title">
            <span className="username">{username}</span>
            <span className="follow">
              {!ownProfile && (
                <button
                  type="button"
                  className={`follow-button ${
                    followStatus ? "following" : "not-following"
                  }`}
                  onClick={this.toggleFollow}
                >
                  {followStatus ? "Following" : "Follow"}
                </button>
              )}
            </span>
          </div>
          <div className="stats">
            <span className="post-count">
              <strong>{postCount}</strong> posts
            </span>
          </div>
          <div className="bio">{bio}</div>
          <div className="follows-buttons">
            <button
              className="follower-users"
              onClick={this.toggleFollowersIndex}
            >
              {followerCount} Followers
            </button>
            <button
              className="following-users"
              onClick={this.toggleFollowingIndex}
            >
              Following {followingCount}
            </button>
          </div>
          {showFollowers && users && followers && (
            <div className="follows-modal" onClick={this.toggleFollowersIndex}>
              <FollowersIndexContainer
                user={user}
                list={"Followers"}
                users={users}
                follows={followers}
                close={this.toggleFollowersIndex}
              />
            </div>
          )}
          {showFollowing && users && following && (
            <div className="follows-modal" onClick={this.toggleFollowingIndex}>
              <FollowersIndexContainer
                user={user}
                list={"Following"}
                users={users}
                follows={following}
                close={this.toggleFollowingIndex}
              />
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default ProfileUserInfo;
