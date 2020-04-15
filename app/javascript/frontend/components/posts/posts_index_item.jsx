import React from "react";
import { Link } from "react-router-dom";
import { makeShortTitle } from "../../util/misc_util";

class PostsIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likesCount: 0,
      liked: false,
    };
    this.toggleLiked = this.toggleLiked.bind(this);
  }

  componentDidMount() {
    this.setState({
      likesCount: Object.keys(this.props.likes).length,
      liked: this.props.likes[this.props.currentUser.id] ? true : false,
    });
  }

  toggleLiked(e) {
    e.stopPropagation();
    e.preventDefault();
    const { liked, likesCount } = this.state;
    const {
      createPostLike,
      deletePostLike,
      likes,
      currentUser,
      postId,
    } = this.props;
    if (liked) {
      const likeId = likes[currentUser.id].id;
      deletePostLike(likeId);
      this.setState({ liked: false, likesCount: likesCount - 1 });
    } else {
      createPostLike(postId);
      this.setState({ liked: true, likesCount: likesCount + 1 });
    }
  }

  render() {
    const { post, likes, postId } = this.props;
    const { liked, likesCount } = this.state;
    const { title, description, imageUrl, date } = post;
    return (
      <li
        className="posts-index-item"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="frame" onClick={this.props.updateModal(postId)}>
          <div className="overlay">
            <div className="post-details">
              <div className="title">{makeShortTitle(title)}</div>
              <div className="date">{makeShortTitle(date)}</div>
            </div>
            <div className="likes-button-container">
              <button
                type="button"
                onClick={this.toggleLiked}
                className="likes-button index"
              >
                <i
                  className={`fas fa-heart ${liked ? "liked" : "unliked"}`}
                ></i>
              </button>
              <div className={`likes-count ${liked ? "liked" : "unliked"}`}>
                {likesCount}
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default PostsIndexItem;
