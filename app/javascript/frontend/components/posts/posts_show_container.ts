import { connect } from 'react-redux'
import { fetchPost } from '../../actions/post_actions'
import PostShow from './post_show'

const mapStateToProps = (state, { match }) => {
  const postId = parseInt(match.params.postId)
  return {
    postId,
    posts: state.entities.posts,
    loading: state.ui.loading,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchPost: id => dispatch(fetchPost(id, true)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PostShow)
