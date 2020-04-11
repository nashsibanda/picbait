import React from "react";
import { makeFilename } from "../../util/misc_util";

class ProfileUserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newAvatarUrl: "",
      newAvatarFile: null,
    };
    this.handleNewAvatar = this.handleNewAvatar.bind(this);
    this.submitNewAvatar = this.submitNewAvatar.bind(this);
    this.clearNewAvatar = this.clearNewAvatar.bind(this);
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

  render() {
    const { ownProfile } = this.props;
    const { username, bio, id, postCount, avatarUrl } = this.props.user;
    const { newAvatarUrl } = this.state;
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
              <button>Follow</button>
            </span>
          </div>
          <div className="stats">
            <span className="post-count">
              <strong>{postCount}</strong> posts
            </span>
          </div>
          <div className="bio">{bio}</div>
        </section>
      </div>
    );
  }
}

export default ProfileUserInfo;
