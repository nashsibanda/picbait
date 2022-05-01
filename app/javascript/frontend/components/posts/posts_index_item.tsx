import React, { MouseEventHandler, SyntheticEvent } from 'react'
import { connect } from 'react-redux'
import {
  createPostLike as createPostLikeAction,
  deletePostLike as deletePostLikeAction,
} from '../../actions/like_actions'
import { PostEntity, PostsIndexType } from '../../types/entities'
import { AuthenticatedGlobalState, GlobalDispatch, LikesState } from '../../types/state'
import { makeShortTitle } from '../../util/misc_util'

type PostsIndexItemState = {
  likesCount: number
  liked: boolean
}

class PostsIndexItem extends React.Component<PostsIndexItemProps, PostsIndexItemState> {
  constructor(props: PostsIndexItemProps) {
    super(props)
    this.state = {
      likesCount: 0,
      liked: false,
    }
    this.toggleLiked = this.toggleLiked.bind(this)
  }

  componentDidMount() {
    const { likes, postId, currentUser } = this.props
    this.setState({
      likesCount: Object.keys(likes[postId]).length,
      liked: !!likes[postId][currentUser.id],
    })
  }

  componentDidUpdate(prevProps: PostsIndexItemProps) {
    const { likes, currentUser, postId } = this.props
    if (likes !== prevProps.likes) {
      this.setState({
        likesCount: Object.keys(likes[postId]).length,
        liked: !!likes[postId][currentUser.id],
      })
    }
  }

  toggleLiked(e: SyntheticEvent) {
    e.stopPropagation()
    e.preventDefault()
    const { liked, likesCount } = this.state
    const { createPostLike, deletePostLike, likes, currentUser, postId } = this.props
    if (liked) {
      const likeId = likes[postId][currentUser.id].id
      deletePostLike(likeId)
      this.setState({ liked: false, likesCount: likesCount - 1 })
    } else {
      createPostLike(postId)
      this.setState({ liked: true, likesCount: likesCount + 1 })
    }
  }

  render() {
    const { post, postId, postsIndexType, updateModal } = this.props
    const { liked, likesCount } = this.state
    const { title, imageUrl, date, authorUsername } = post
    return (
      <li className='posts-index-item' style={{ backgroundImage: `url(${imageUrl})` }}>
        <div className='frame' onClick={updateModal(postId)}>
          <div className='overlay'>
            <div className='post-details'>
              <div className='title'>
                <span>{makeShortTitle(title)}</span>
              </div>
              {postsIndexType === PostsIndexType.feed ? (
                <div className='author'>
                  <span>@{authorUsername}</span>
                </div>
              ) : (
                <div className='date'>
                  <span>{date}</span>
                </div>
              )}
            </div>
            <div className='likes-button-container'>
              <button
                type='button'
                onClick={this.toggleLiked}
                className={`likes-button index ${liked ? 'liked' : 'unliked'}`}
              >
                <i className='fas fa-heart' />
              </button>
              <div className={`likes-count ${liked ? 'liked' : 'unliked'}`}>{likesCount}</div>
            </div>
          </div>
        </div>
      </li>
    )
  }
}

const mapStateToProps = (state: AuthenticatedGlobalState) => ({
  currentUser: state.session.currentUser,
})

const mapDispatchToProps = (dispatch: GlobalDispatch) => ({
  createPostLike: (postId: number) => dispatch(createPostLikeAction(postId)),
  deletePostLike: (id: number) => dispatch(deletePostLikeAction(id)),
})

export type PostsIndexItemProps = Required<
  ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>
> & {
  post: PostEntity
  postId: number
  likes: LikesState
  postsIndexType: PostsIndexType
  updateModal: (postId: number) => MouseEventHandler
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndexItem)
