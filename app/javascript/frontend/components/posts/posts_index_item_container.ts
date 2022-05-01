import { MouseEventHandler } from 'react'
import { connect } from 'react-redux'
import { createPostLike, deletePostLike } from '../../actions/like_actions'
import { PostEntity, PostType } from '../../types/entities'
import { AuthenticatedGlobalState, GlobalDispatch, LikesState } from '../../types/state'
import PostsIndexItem from './posts_index_item'

const mapStateToProps = (state: AuthenticatedGlobalState) => ({
  currentUser: state.session.currentUser,
})

const mapDispatchToProps = (dispatch: GlobalDispatch) => ({
  createPostLike: (postId: number) => dispatch(createPostLike(postId)),
  deletePostLike: (id: number) => dispatch(deletePostLike(id)),
})

export type PostsIndexItemProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    post: PostEntity
    postId: number
    likes: LikesState
    type: PostType
    updateModal: (postId: number) => MouseEventHandler
  }

export default connect(mapStateToProps, mapDispatchToProps)(PostsIndexItem)
