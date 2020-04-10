import React from "react";
import { ProfileUserInfo } from "./profile_user_info";

class ProfileShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { fetchUser, userId } = this.props;
    fetchUser(userId);
  }

  render() {
    const { users, userId } = this.props;
    const profileUser = users[userId];
    return (
      <div className="profile-show-container">
        <ProfileUserInfo user={profileUser} />
      </div>
    );
  }
}

export default ProfileShow;
