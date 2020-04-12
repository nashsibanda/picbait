import React from "react";
import CommentsIndexItem from "./comments_index_item";

class CommentsIndex extends React.Component {
  constructor(props) {
    super(props);
    this.commentsArray = this.commentsArray.bind(this);
  }

  commentsArray(parentId = null) {
    const { comments } = this.props;
    if (comments instanceof Array) {
      return comments;
    }
    const outputArray = [];
    const commentKeys = Object.keys(comments).sort((a, b) => b - a);
    commentKeys.forEach(commentId => {
      const comment = comments[commentId];
      if (comment.parentCommentId === parentId) {
        outputArray.push(comment);
      }
    });
    return outputArray;
  }

  render() {
    const { comments, users, nested } = this.props;
    return (
      <ul className="comments-index">
        {this.commentsArray().map(comment => {
          return (
            <CommentsIndexItem
              comment={comment}
              key={comment.id}
              commenter={users[comment.commenter]}
              children={nested ? [] : this.commentsArray(comment.id)}
              // nested={nested}
            />
          );
        })}
      </ul>
    );
  }
}
export default CommentsIndex;
