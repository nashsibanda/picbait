import React from "react";
import CommentsIndexItemContainer from "./comments_index_item_container";

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
    const { users, nested, updateParent } = this.props;
    return (
      <ul className="comments-index">
        {this.commentsArray().map(comment => {
          return (
            users[comment.commenter] &&
            comment && (
              <CommentsIndexItemContainer
                comment={comment}
                key={comment.id}
                commenter={users[comment.commenter]}
                children={nested ? [] : this.commentsArray(comment.id)}
                updateParent={updateParent}
              />
            )
          );
        })}
      </ul>
    );
  }
}
export default CommentsIndex;
