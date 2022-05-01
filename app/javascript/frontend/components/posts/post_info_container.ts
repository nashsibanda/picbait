import { connect } from 'react-redux'
import { createComment } from '../../actions/comment_actions'
import { createPostLike, deletePostLike } from '../../actions/like_actions'
import { PostEntity } from '../../types/entities'
import { AuthenticatedGlobalState, GlobalDispatch } from '../../types/state'
import PostInfo from './post_info'

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
  createPostLike: (postId: number) => dispatch(createPostLike(postId)),
  deletePostLike: (id: number) => dispatch(deletePostLike(id)),
  createComment: (formComment: FormData) => dispatch(createComment(formComment)),
})

type OwnProps = {
  post: PostEntity
}

export type PostInfoProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & OwnProps

export default connect(mapStateToProps, mapDispatchToProps)(PostInfo)
