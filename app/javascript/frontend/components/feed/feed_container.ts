import { connect } from 'react-redux'
import { clearPosts, fetchFeedPosts } from '../../actions/post_actions'
import { AuthenticatedGlobalState, GlobalDispatch } from '../../types/state'
import Feed from './feed'

const mapStateToProps = (state: AuthenticatedGlobalState) => {
  const userId = state.session.currentUser.slug
  return {
    users: state.entities.users,
    posts: state.entities.posts,
    userId,
    likes: state.entities.likes.posts,
    loading: state.ui.loading,
  }
}

const mapDispatchToProps = (dispatch: GlobalDispatch) => ({
  fetchFeedPosts: (page: number) => dispatch(fetchFeedPosts(page)),
  clearPosts: () => dispatch(clearPosts()),
})

export type FeedProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
