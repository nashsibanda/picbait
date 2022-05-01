import { connect } from 'react-redux'
import { createCommentLike, deleteCommentLike } from '../../actions/like_actions'
import { CommentEntity, UserEntity } from '../../types/entities'
import { AuthenticatedGlobalState, GlobalDispatch } from '../../types/state'
import { getUsersAutocomplete } from '../../util/users_api_util'
import CommentsIndexItem from './comments_index_item'

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
  createCommentLike: (commentId: number) => dispatch(createCommentLike(commentId)),
  deleteCommentLike: (id: number) => dispatch(deleteCommentLike(id)),
  fetchUsernameAutocomplete: () => getUsersAutocomplete(),
})

type CommentsIndexItemOwnProps = {
  comment: CommentEntity
  commenter: UserEntity
  childComments: CommentEntity[]
  updateParent: (parentId: number, commenter: string) => any
}

export type CommentsIndexItemProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
  CommentsIndexItemOwnProps

export default connect(mapStateToProps, mapDispatchToProps)(CommentsIndexItem)
