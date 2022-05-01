import React from 'react'
import { CommentEntity } from '../../types/entities'
import { UsersState } from '../../types/state'
import type { CommentsIndexProps } from './comments_index_container'
import CommentsIndexItemContainer from './comments_index_item_container'

class CommentsIndex extends React.Component<CommentsIndexProps> {
  constructor(props: CommentsIndexProps) {
    super(props)
    this.commentsArray = this.commentsArray.bind(this)
  }

  commentsArray(parentId: number | null = null) {
    const { comments } = this.props
    if (comments instanceof Array) {
      return comments
    }
    const outputArray: CommentEntity[] = []
    const tempNewestFirstBool = true
    let commentKeys
    if (tempNewestFirstBool) {
      commentKeys = Object.keys(comments).sort((a, b) => (b as any) - (a as any))
    } else {
      commentKeys = Object.keys(comments).sort((a, b) => (a as any) - (b as any))
    }
    commentKeys
      .map(k => parseInt(k, 10))
      .forEach(commentId => {
        const comment = comments[commentId]
        if (comment.parentCommentId === parentId) {
          outputArray.push(comment)
        }
      })
    return outputArray
  }

  render() {
    const { users, nested, updateParent } = this.props
    const stateUsers = users as UsersState
    return (
      <ul className='comments-index'>
        {this.commentsArray().map(
          comment =>
            stateUsers[comment.commenter] &&
            comment && (
              <CommentsIndexItemContainer
                comment={comment}
                key={comment.id}
                commenter={stateUsers[comment.commenter]}
                childComments={nested ? [] : this.commentsArray(comment.id)}
                updateParent={updateParent}
              />
            )
        )}
      </ul>
    )
  }
}

export default CommentsIndex
