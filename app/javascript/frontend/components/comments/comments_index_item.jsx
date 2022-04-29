import React from "react";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";
import CommentsIndexContainer from "./comments_index_container";
import { makeCommentLinks } from "../../util/misc_util";
import parse from "html-react-parser";

class CommentsIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.goToUserPage = this.goToUserPage.bind(this);
    this.state = {
      displayChildComments: false,
      likesCount: Object.keys(this.props.likes).length,
      liked: this.props.likes[this.props.currentUser.id] ? true : false,
    };
    this.toggleChildComments = this.toggleChildComments.bind(this);
    this.toggleLiked = this.toggleLiked.bind(this);
    this.sendParentId = this.sendParentId.bind(this);
  }

  sendParentId(e) {
    e.stopPropagation();
    const { updateParent, comment } = this.props;
    const parentId = comment.parentCommentId
      ? comment.parentCommentId
      : comment.id;
    const { commenter } = comment;
    updateParent(parentId, commenter);
  }

  toggleLiked(e) {
    e.stopPropagation();
    e.preventDefault();
    const { liked, likesCount } = this.state;
    const {
      createCommentLike,
      deleteCommentLike,
      likes,
      currentUser,
    } = this.props;
    const { id } = this.props.comment;
    if (liked) {
      const likeId = likes[currentUser.id].id;
      deleteCommentLike(likeId);
      this.setState({ liked: false, likesCount: likesCount - 1 });
    } else {
      createCommentLike(id);
      this.setState({ liked: true, likesCount: likesCount + 1 });
    }
  }

  goToUserPage(e) {
    e.stopPropagation();
    e.preventDefault();
    const { slug } = this.props.commenter;
    push(`/users/${slug}`);
  }

  toggleChildComments(e) {
    e.stopPropagation();
    e.preventDefault();
    this.setState({ displayChildComments: !this.state.displayChildComments });
  }

  render() {
    const { body, date, timeAgo } = this.props.comment;
    const { slug, avatarUrl, username } = this.props.commenter;
    const {
      children,
      updateParent,
      usersAutocomplete,
      loadingUsersAutocomplete,
    } = this.props;
    const { displayChildComments, liked, likesCount } = this.state;
    return (
      <div className="comment">
        <div className="avatar">
          <div
            className="container"
            style={{
              backgroundImage: `url(${avatarUrl})`,
            }}
            onClick={this.goToUserPage}
          ></div>
        </div>
        <div className="details">
          <div className="main-body">
            <div className="main-text">
              <span className="username">
                <Link to={`/users/${slug}`}>{username}</Link>
              </span>
              <span className="body">
                {!loadingUsersAutocomplete &&
                  parse(makeCommentLinks(body, usersAutocomplete))}
              </span>
            </div>
            <div className="like-button-container">
              <button className="likes-button" onClick={this.toggleLiked}>
                <i
                  className={`fas fa-heart ${liked ? "liked" : "unliked"}`}
                ></i>
              </button>
            </div>
          </div>
          <div className="stats">
            <span className="date" title={date}>
              {timeAgo} ago
            </span>
            <span className={`like-display ${likesCount > 0 ? "" : "hidden"}`}>
              {`${likesCount} ${likesCount > 1 ? "likes" : "like"}`}
            </span>
            <button className="reply-button" onClick={this.sendParentId}>
              Reply
            </button>
          </div>
          {children.length > 0 && (
            <div className="child-comments">
              <div className="child-comments-toggle">
                {displayChildComments ? (
                  <button type="button" onClick={this.toggleChildComments}>
                    <i className="fas fa-minus"></i>
                    {children.length + " "}
                    {children.length === 1 ? "Reply" : "Replies"}
                  </button>
                ) : (
                  <button type="button" onClick={this.toggleChildComments}>
                    <i className="fas fa-plus"></i>
                    {children.length + " "}
                    {children.length === 1 ? "Reply" : "Replies"}
                  </button>
                )}
              </div>
              {displayChildComments && (
                <CommentsIndexContainer
                  comments={children}
                  nested={true}
                  updateParent={updateParent}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CommentsIndexItem;
