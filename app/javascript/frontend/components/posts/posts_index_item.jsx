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
    const { likes, postId, currentUser } = this.props;
    this.setState({
      likesCount: Object.keys(likes[postId]).length,
      liked: likes[postId][currentUser.id] ? true : false,
    });
  }

  componentDidUpdate(prevProps) {
    console.log("updating");
    if (this.props.likes != prevProps.likes) {
      this.setState({
        likesCount: Object.keys(this.props.likes[this.props.postId]).length,
        liked: this.props.likes[this.props.postId][this.props.currentUser.id]
          ? true
          : false,
      });
    }
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
    const { post, postId, type, likes, currentUser } = this.props;
    const { liked, likesCount } = this.state;
    const { title, imageUrl, date, authorUsername } = post;
    return (
      <li
        className="posts-index-item"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="frame" onClick={this.props.updateModal(postId)}>
          <div className="overlay">
            <div className="post-details">
              <div className="title">
                <span>{makeShortTitle(title)}</span>
              </div>
              {type === "feed" ? (
                <div className="author">
                  <span>@{authorUsername}</span>
                </div>
              ) : (
                <div className="date">
                  <span>{date}</span>
                </div>
              )}
            </div>
            <div className="likes-button-container">
              <button
                type="button"
                onClick={this.toggleLiked}
                className={`likes-button index ${liked ? "liked" : "unliked"}`}
              >
                <i className={`fas fa-heart`}></i>
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
