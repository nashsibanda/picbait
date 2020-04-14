import React from "react";
import { FollowersIndexItem } from "./followers_index_item";

class FollowersIndex extends React.Component {
  constructor(props) {
    super(props);
    this.preventPropagation = this.preventPropagation.bind(this);
  }

  preventPropagation(e) {
    e.stopPropagation();
  }

  // componentDidMount() {
  //   const { fetchUsers, user } = this.props;
  //   fetchUsers({ user_id: user.slug });
  // }

  render() {
    const { follows, users, list } = this.props;
    return (
      <ul className="follows-list" onClick={this.preventPropagation}>
        <h2>{list}</h2>
        {Object.keys(follows).map(slug => {
          const user = users[slug];

          return <FollowersIndexItem user={user} key={slug} />;
        })}
      </ul>
    );
  }
}

export default FollowersIndex;
