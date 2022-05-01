import { MouseEventHandler } from 'react'
import { connect } from 'react-redux'
import { fetchPost } from '../../actions/post_actions'
import { GlobalDispatch, GlobalState } from '../../types/state'
import PostModal from './posts_modal'

const mapStateToProps = (state: GlobalState) => ({
  posts: state.entities.posts,
})

const mapDispatchToProps = (dispatch: GlobalDispatch) => ({
  fetchPost: (id: number, shouldFetchPost: boolean) => dispatch(fetchPost(id, shouldFetchPost)),
})

export type PostModalProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & { postId: number; closeModal: MouseEventHandler }

export default connect(mapStateToProps, mapDispatchToProps)(PostModal)
