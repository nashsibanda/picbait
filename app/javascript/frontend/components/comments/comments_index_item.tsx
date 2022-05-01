import { push } from 'connected-react-router'
import parse from 'html-react-parser'
import React, { SyntheticEvent } from 'react'
import { Link } from 'react-router-dom'
import { makeCommentLinks } from '../../util/misc_util'
import CommentsIndexContainer from './comments_index_container'
import { CommentsIndexItemProps } from './comments_index_item_container'

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
                    {childComments.length === 1 ? 'Reply' : 'Replies'}
                  </button>
                ) : (
                  <button type='button' onClick={this.toggleChildComments}>
                    <i className='fas fa-plus' />
                    {`${childComments.length} `}
                    {childComments.length === 1 ? 'Reply' : 'Replies'}
                  </button>
                )}
              </div>
              {displayChildComments && (
                <CommentsIndexContainer comments={childComments} nested updateParent={updateParent} />
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default CommentsIndexItem
