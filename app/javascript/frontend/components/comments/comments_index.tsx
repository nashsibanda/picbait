import React from 'react'
import { connect } from 'react-redux'
import { CommentEntity } from '../../types/entities'
import { CommentsState, GlobalState, UsersState } from '../../types/state'
// eslint-disable-next-line import/no-cycle
import CommentsIndexItem from './comments_index_item'

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
              <CommentsIndexItem
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

const mapStateToProps = (state: GlobalState) => ({
  users: state.entities.users,
})

export type CommentsIndexProps = Partial<ReturnType<typeof mapStateToProps>> & {
  comments: CommentsState | CommentEntity[]
  nested: boolean
  updateParent: (parentId: number, commenter: string) => any
}

export default connect(mapStateToProps, null)(CommentsIndex)
