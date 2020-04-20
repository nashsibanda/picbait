import React from "react";
import FollowersIndexContainer from "./../followers/followers_index_container";
import { sanitizeContent } from "../../util/misc_util";
import { CircularProgressbar } from "react-circular-progressbar";

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
      displayAvatarEl: null,
      loadingAvatar: false,
      showBioForm: false,
      formBio: this.props.user.bio || "",
    };
    this.handleNewAvatar = this.handleNewAvatar.bind(this);
    this.submitNewAvatar = this.submitNewAvatar.bind(this);
    this.clearNewAvatar = this.clearNewAvatar.bind(this);
    this.toggleFollow = this.toggleFollow.bind(this);
    this.toggleFollowingIndex = this.toggleFollowingIndex.bind(this);
    this.toggleFollowersIndex = this.toggleFollowersIndex.bind(this);
    this.displayAvatar = this.displayAvatar.bind(this);
    this.toggleBioForm = this.toggleBioForm.bind(this);
    this.updateBio = this.updateBio.bind(this);
    this.submitNewBio = this.submitNewBio.bind(this);
    this.cancelBioUpdate = this.cancelBioUpdate.bind(this);
  }

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

  toggleBioForm(e) {
    this.setState({ showBioForm: !this.state.showBioForm });
  }

  updateBio(e) {
    e.preventDefault();
    this.setState({ formBio: e.target.value });
  }

  cancelBioUpdate(e) {
    e.preventDefault();
    this.setState({ formBio: this.props.user.bio || "", showBioForm: false });
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
      this.setState({
        showFollowing: false,
        showFollowers: false,
        showBioForm: false,
      });
    }
  }

  clearNewAvatar(e) {
    e.preventDefault();
    this.setState({
      newAvatarUrl: "",
      newAvatarFile: null,
      displayAvatarEl: null,
      loadingAvatar: false,
    });
    this.avatarInput.value = "";
  }

  handleNewAvatar(e) {
    this.setState({ loadingAvatar: true, displayAvatarEl: null });
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () =>
      this.setState(
        { newAvatarUrl: reader.result, newAvatarFile: file },
        this.displayAvatar
      );

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this.setState({
        newAvatarUrl: "",
        newAvatarFile: null,
        loadingAvatar: false,
      });
    }
  }

  displayAvatar() {
    loadImage(
      this.state.newAvatarUrl,
      img => {
        this.setState({ displayAvatarEl: img }, () => {
          this.setState({ loadingAvatar: false }, () => {
            if (this.state.displayAvatarEl instanceof Element) {
              this.avatarPreview.appendChild(this.state.displayAvatarEl);
            } else {
              alert("This is not a valid image file format!");
            }
          });
        });
      },
      {
        orientation: true,
        aspectRatio: 1 / 1,
        cover: true,
      }
    );
  }

  submitNewAvatar(e) {
    e.preventDefault();
    const formUser = new FormData();
    const { newAvatarFile } = this.state;
    const { slug } = this.props.user;
    formUser.append("user[avatar]", newAvatarFile);
    this.props.updateUser(slug, formUser);
    this.setState({
      newAvatarUrl: "",
      newAvatarFile: null,
      displayAvatarEl: false,
    });
  }

  submitNewBio(e) {
    e.preventDefault();
    const formUser = new FormData();
    const { formBio } = this.state;
    const { slug } = this.props.user;
    formUser.append("user[bio]", sanitizeContent(formBio));
    this.props.updateUser(slug, formUser);
    this.setState({ showBioForm: false });
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
      displayAvatarEl,
      showBioForm,
      formBio,
    } = this.state;
    return (
      <div className="profile-user-info">
        <section className="avatar">
          <div
            className="container"
            style={{
              backgroundImage: `url(${avatarUrl})`,
            }}
          >
            {displayAvatarEl && (
              <div
                className="avatar-preview"
                ref={ref => (this.avatarPreview = ref)}
              ></div>
            )}
            {ownProfile && (
              <>
                <input
                  type="file"
                  onChange={this.handleNewAvatar}
                  id="edit-avatar-input"
                  ref={el => (this.avatarInput = el)}
                ></input>
                <label className="edit-avatar-icon" htmlFor="edit-avatar-input">
                  <i className="fas fa-camera"></i>
                </label>
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
          {showBioForm ? (
            <form onSubmit={this.submitNewBio} className="bio">
              <div>
                <textarea
                  placeholder="Add a short bio..."
                  value={formBio}
                  onChange={this.updateBio}
                  maxLength="200"
                ></textarea>
                <CircularProgressbar value={formBio.length} maxValue={200} />
              </div>
              <div className="submit-buttons">
                <button type="submit" className="bio-button">
                  <i className="fas fa-save"></i>{" "}
                  <span className="button-text">Save</span>
                </button>
                <button
                  type="button"
                  className="bio-button"
                  onClick={this.cancelBioUpdate}
                >
                  <i className="fas fa-times"></i>{" "}
                  <span className="button-text">Cancel</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="bio">
              <p>{bio}</p>
              {ownProfile && (
                <button
                  type="button"
                  className="bio-button"
                  onClick={this.toggleBioForm}
                >
                  <i className="fas fa-edit"></i>{" "}
                  <span className="button-text">Edit bio...</span>
                </button>
              )}
            </div>
          )}
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
