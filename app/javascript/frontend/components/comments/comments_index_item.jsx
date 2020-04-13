import React from "react";
import { Link } from "react-router-dom";
import { push } from "connected-react-router";
import CommentsIndexContainer from "./comments_index_container";

class CommentsIndexItem extends React.Component {
  constructor(props) {
    super(props);
    this.goToUserPage = this.goToUserPage.bind(this);
    this.state = {
      displayChildComments: false,
    };
    this.toggleChildComments = this.toggleChildComments.bind(this);
  }

  goToUserPage(e) {
    e.preventDefault();
    const { slug } = this.props.commenter;
    push(`/users/${slug}`);
  }

  toggleChildComments(e) {
    e.preventDefault();
    this.setState({ displayChildComments: !this.state.displayChildComments });
  }

  render() {
    const { body, date, timeAgo } = this.props.comment;
    const { slug, avatarUrl, username } = this.props.commenter;
    const { children } = this.props;
    const { displayChildComments } = this.state;
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
          <div className="main-text">
            <span className="username">
              <Link to={`/users/${slug}`}>{username}</Link>
            </span>
            <span className="body">{body}</span>
          </div>
          <div className="stats">
            <span className="date" title={date}>
              {timeAgo}
            </span>
            <span className="like-button">1 like</span>
            <span className="reply-button">Reply</span>
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
                <CommentsIndexContainer comments={children} nested={true} />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default CommentsIndexItem;
