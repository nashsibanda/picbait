import React, { ChangeEvent, FormEvent, SyntheticEvent } from 'react'
import { CircularProgressbar } from 'react-circular-progressbar'
import { connect } from 'react-redux'
import { createComment as createCommentAction } from '../../actions/comment_actions'
import {
  createPostLike as createPostLikeAction,
  deletePostLike as deletePostLikeAction,
} from '../../actions/like_actions'
import { PostEntity } from '../../types/entities'
import { AuthenticatedGlobalState, GlobalDispatch } from '../../types/state'
import { replaceParentCommenter, sanitizeContent } from '../../util/misc_util'
import CommentsIndex from '../comments/comments_index'
import LoadingSpinner from '../ui/loading_spinner'
import PostAuthor from './post_author'

type PostInfoState = {
  fillImage: boolean
  liked: boolean
  likesCount: number
  body: string
  parentCommentId: number | null
  parentCommenter: string | null
  commentIndicator: boolean
  imageLoaded: boolean
}
class PostInfo extends React.Component<PostInfoProps, PostInfoState> {
  commentInput: HTMLTextAreaElement | null

  constructor(props: PostInfoProps) {
    super(props)
    const { currentUser, likes } = props
    this.state = {
      fillImage: true,
      liked: !!likes[currentUser.id],
      likesCount: Object.keys(likes).length,
      body: '',
      parentCommentId: null,
      parentCommenter: null,
      commentIndicator: false,
      imageLoaded: false,
    }
    this.toggleFillImage = this.toggleFillImage.bind(this)
    this.toggleLiked = this.toggleLiked.bind(this)
    this.updateBody = this.updateBody.bind(this)
    this.updateParentComment = this.updateParentComment.bind(this)
    this.submitComment = this.submitComment.bind(this)
    this.setCommentInputFocus = this.setCommentInputFocus.bind(this)
    this.toggleCommentIndicator = this.toggleCommentIndicator.bind(this)
    this.closeReplyingBanner = this.closeReplyingBanner.bind(this)
    this.handleImageLoaded = this.handleImageLoaded.bind(this)
    this.commentInput = null
  }

  handleImageLoaded() {
    this.setState({ imageLoaded: true })
  }

  setCommentInputFocus(e: SyntheticEvent) {
    e.stopPropagation()
    this.commentInput?.focus()
  }

  updateBody(e: ChangeEvent<HTMLTextAreaElement>) {
    e.stopPropagation()
    this.setState({ body: e.target.value })
  }

  updateParentComment(id: number | null, commenter: string | null): any {
    this.setState(
      prevState => ({
        parentCommentId: id,
        parentCommenter: commenter,
        body: replaceParentCommenter(commenter, prevState.body),
      }),
      () => this.commentInput?.focus()
    )
  }

  toggleCommentIndicator() {
    this.setState(prevState => ({ commentIndicator: !prevState.commentIndicator }))
  }

  submitComment(e: FormEvent) {
    e.preventDefault()
    e.stopPropagation()
    const formComment = new FormData()
    const { body, parentCommentId } = this.state
    const { postId, currentUser, createComment } = this.props
    formComment.append('comment[body]', sanitizeContent(body))
    if (parentCommentId) {
      formComment.append('comment[parent_comment_id]', parentCommentId.toString())
    }
    formComment.append('comment[api_post_id]', postId.toString())
    formComment.append('comment[api_user_id]', currentUser.id.toString())
    createComment(formComment)
    this.setState({ body: '', parentCommentId: null, parentCommenter: null })
  }

  toggleFillImage(e: SyntheticEvent) {
    e.stopPropagation()
    this.setState(prevState => ({ fillImage: !prevState.fillImage }))
  }

  toggleLiked(e: SyntheticEvent) {
    e.stopPropagation()
    const { liked, likesCount } = this.state
    const { createPostLike, deletePostLike, likes, currentUser, postId } = this.props
    if (liked) {
      const likeId = likes[currentUser.id].id
      deletePostLike(likeId)
      this.setState({ liked: false, likesCount: likesCount - 1 })
    } else {
      createPostLike(postId)
      this.setState({ liked: true, likesCount: likesCount + 1 })
    }
  }

  closeReplyingBanner(e: SyntheticEvent) {
    e.stopPropagation()
    this.updateParentComment(null, null)
  }

  render() {
    const { post, comments, loading, posting, author } = this.props
    const { fillImage, liked, likesCount, body, parentCommenter, commentIndicator, imageLoaded } = this.state
    const { id, title, imageUrl, authorUsername } = post
    return (
      <div className='post-info'>
        <section className='image'>
          {!imageLoaded && <div className='image-placeholder' />}
          {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
          <img
            src={imageUrl}
            className={fillImage ? 'fill-image' : 'fit-image'}
            onClick={this.toggleFillImage}
            onLoad={this.handleImageLoaded}
            alt={`${title} - by ${authorUsername}`}
          />
          <button className='expand' onClick={this.toggleFillImage} type='button'>
            <i className={`fas ${fillImage ? 'fa-compress-alt' : 'fa-expand-alt'}`} />
          </button>
        </section>
        <section className='details'>
          <div className='author-details'>{author ? <PostAuthor author={author} /> : <LoadingSpinner />}</div>
          <div className='comments'>
            {loading.comments ? (
              <LoadingSpinner />
            ) : (
              <CommentsIndex comments={comments} nested={false} updateParent={this.updateParentComment} />
            )}
          </div>
          <div className='interactions'>
            <div className='interaction-buttons'>
              <button type='button' onClick={this.setCommentInputFocus} className='likes-button index'>
                <i className='fas fa-comment-alt' />
                <span className='interaction-number'>
                  {`${Object.keys(comments).length > 0 ? Object.keys(comments).length : '0'}`}
                </span>
                <span className='interaction-desc button-text'>
                  {`${Object.keys(comments).length === 1 ? 'comment' : 'comments'}`}
                </span>
              </button>
              <button
                type='button'
                onClick={this.toggleLiked}
                className={`likes-button index ${liked ? 'liked' : 'unliked'}`}
              >
                <i className='fas fa-heart' />
                <span className='interaction-desc button-text'>{'liked by '}</span>
                <span className='interaction-num'>{likesCount > 0 ? likesCount : '0'}</span>
                <span className='interaction-desc button-text'>{likesCount === 1 ? ' user' : ' users'}</span>
              </button>
            </div>
            <a href={`#/posts/${id}`} className='permalink'>
              permalink
            </a>
          </div>
          <form className='comment-form' onSubmit={this.submitComment}>
            <div className={`replying-banner ${parentCommenter ? '' : 'hidden'}`}>
              <span>replying to {parentCommenter}</span>
              <button className='close-reply-banner' onClick={this.closeReplyingBanner} type='button'>
                <i className='fas fa-times' />
              </button>
            </div>
            <textarea
              placeholder='Add a comment...'
              value={body}
              onChange={this.updateBody}
              ref={input => {
                this.commentInput = input
              }}
              maxLength={200}
              onFocus={this.toggleCommentIndicator}
              onBlur={this.toggleCommentIndicator}
            />
            {posting.comments ? (
              <LoadingSpinner />
            ) : (
              <button type='submit' className='submit-button'>
                Post
              </button>
            )}
            {commentIndicator && (
              <CircularProgressbar value={body.length} maxValue={200} className='comment-indicator' />
            )}
          </form>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state: AuthenticatedGlobalState, ownProps: OwnProps) => {
  const { id } = ownProps.post
  return {
    author: state.entities.users[ownProps.post.authorSlug],
    comments: state.entities.comments,
    likes: state.entities.likes.posts[id],
    currentUser: state.session.currentUser,
    postId: id,
    loading: state.ui.loading,
    posting: state.ui.posting,
  }
}

const mapDispatchToProps = (dispatch: GlobalDispatch) => ({
  createPostLike: (postId: number) => dispatch(createPostLikeAction(postId)),
  deletePostLike: (id: number) => dispatch(deletePostLikeAction(id)),
  createComment: (formComment: FormData) => dispatch(createCommentAction(formComment)),
})

type OwnProps = {
  post: PostEntity
}

export type PostInfoProps = Required<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> &
  OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(PostInfo)
