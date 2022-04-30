import { connect } from 'react-redux'
import { clearPosts, fetchFeedPosts } from '../../actions/post_actions'
import Feed from './feed'

const mapStateToProps = (state, { match }) => {
  const userId = state.session.currentUser.slug
  return {
    users: state.entities.users,
    posts: state.entities.posts,
    userId,
    likes: state.entities.likes.posts,
    loading: state.ui.loading,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchFeedPosts: page => dispatch(fetchFeedPosts(page)),
  clearPosts: () => dispatch(clearPosts()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
