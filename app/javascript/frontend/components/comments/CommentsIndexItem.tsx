import { push } from 'connected-react-router'
import parse from 'html-react-parser'
import React, { SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  createCommentLike as createCommentLikeAction,
  deleteCommentLike as deleteCommentLikeAction,
} from '../../actions/likeActions'
import { CommentEntity, UserEntity } from '../../types/entities'
import { AuthenticatedGlobalState, GlobalDispatch } from '../../types/state'
import { makeCommentLinks } from '../../util/miscUtil'
import { getUsersAutocomplete } from '../../util/usersApiUtil'
// eslint-disable-next-line import/no-cycle
import CommentsIndex from './CommentsIndex'

type CommentsIndexItemState = {
  displayChildComments: boolean
  likesCount: number
  liked: boolean
}

class CommentsIndexItem extends React.Component<CommentsIndexItemProps, CommentsIndexItemState> {
  constructor(props: CommentsIndexItemProps) {
    super(props)
    const { likes, currentUser } = props
    this.goToUserPage = this.goToUserPage.bind(this)
    this.state = {
      displayChildComments: false,
      likesCount: Object.keys(likes).length,
      liked: !!likes[currentUser.id],
    }
    this.toggleChildComments = this.toggleChildComments.bind(this)
    this.toggleLiked = this.toggleLiked.bind(this)
    this.sendParentId = this.sendParentId.bind(this)
  }

  sendParentId(e: SyntheticEvent) {
    e.stopPropagation()
    const { updateParent, comment } = this.props
    const parentId = comment.parentCommentId ? comment.parentCommentId : comment.id
    const { commenter } = comment
    updateParent(parentId, commenter)
  }

  toggleLiked(e: SyntheticEvent) {
    e.stopPropagation()
    e.preventDefault()
    const { liked, likesCount } = this.state
    const { createCommentLike, deleteCommentLike, likes, currentUser, comment } = this.props
    const { id } = comment
    if (liked) {
      const likeId = likes[currentUser.id].id
      deleteCommentLike(likeId)
      this.setState({ liked: false, likesCount: likesCount - 1 })
    } else {
      createCommentLike(id)
      this.setState({ liked: true, likesCount: likesCount + 1 })
    }
  }

  goToUserPage(e: SyntheticEvent) {
    e.stopPropagation()
    e.preventDefault()
    const { commenter } = this.props
    const { slug } = commenter
    push(`/users/${slug}`)
  }

  toggleChildComments(e: SyntheticEvent) {
    e.stopPropagation()
    e.preventDefault()
    this.setState(prevState => ({ displayChildComments: !prevState.displayChildComments }))
  }

  render() {
    const { comment, commenter } = this.props
    const { body, date, timeAgo } = comment
    const { slug, avatarUrl, username } = commenter
    const { childComments, updateParent, usersAutocomplete, loadingUsersAutocomplete } = this.props
    const { displayChildComments, liked, likesCount } = this.state

    const replyText = childComments.length === 1 ? 'Reply' : 'Replies'

    return (
      <div className='comment'>
        <div className='avatar'>
          <div
            className='container'
            style={{
              backgroundImage: `url(${avatarUrl})`,
            }}
            onClick={this.goToUserPage}
            aria-label={`Go to ${username}'s profile`}
          />
        </div>
        <div className='details'>
          <div className='main-body'>
            <div className='main-text'>
              <span className='username'>
                <Link to={`/users/${slug}`}>{username}</Link>
              </span>
              <span className='body'>
                {!loadingUsersAutocomplete && parse(makeCommentLinks(body, usersAutocomplete))}
              </span>
            </div>
            <div className='like-button-container'>
              <button className='likes-button' onClick={this.toggleLiked} type='button'>
                <i className={`fas fa-heart ${liked ? 'liked' : 'unliked'}`} />
              </button>
            </div>
          </div>
          <div className='stats'>
            <span className='date' title={date}>
              {timeAgo} ago
            </span>
            <span className={`like-display ${likesCount > 0 ? '' : 'hidden'}`}>
              {`${likesCount} ${likesCount > 1 ? 'likes' : 'like'}`}
            </span>
            <button className='reply-button' onClick={this.sendParentId} type='button'>
              Reply
            </button>
          </div>
          {childComments.length > 0 && (
            <div className='child-comments'>
              <div className='child-comments-toggle'>
                {displayChildComments ? (
                  <button type='button' onClick={this.toggleChildComments}>
                    <i className='fas fa-minus' />
                    {`${childComments.length} `}
                    {replyText}
                  </button>
                ) : (
                  <button type='button' onClick={this.toggleChildComments}>
                    <i className='fas fa-plus' />
                    {`${childComments.length} `}
                    {replyText}
                  </button>
                )}
              </div>
              {displayChildComments && <CommentsIndex comments={childComments} nested updateParent={updateParent} />}
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AuthenticatedGlobalState, ownProps: CommentsIndexItemOwnProps) => {
  const { id } = ownProps.comment
  return {
    likes: state.entities.likes.comments[id],
    currentUser: state.session.currentUser,
    usersAutocomplete: state.ui.autocomplete.users,
    loadingUsersAutocomplete: state.ui.loading.usersAutocomplete,
  }
}

const mapDispatchToProps = (dispatch: GlobalDispatch) => ({
  createCommentLike: (commentId: number) => dispatch(createCommentLikeAction(commentId)),
  deleteCommentLike: (id: number) => dispatch(deleteCommentLikeAction(id)),
  fetchUsernameAutocomplete: () => getUsersAutocomplete(),
})

type CommentsIndexItemOwnProps = {
  comment: CommentEntity
  commenter: UserEntity
  childComments: CommentEntity[]
  updateParent: (parentId: number, commenter: string) => any
}

export type CommentsIndexItemProps = Required<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
> &
  CommentsIndexItemOwnProps

export default connect(mapStateToProps, mapDispatchToProps)(CommentsIndexItem)
