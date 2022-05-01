import { connect } from 'react-redux'
import { match } from 'react-router'
import { fetchPost } from '../../actions/post_actions'
import { GlobalDispatch, GlobalState } from '../../types/state'
import PostShow from './post_show'

const mapStateToProps = (state: GlobalState, { match: matchOpbject }: { match: match<{ postId: string }> }) => {
  const postId = parseInt(matchOpbject.params.postId, 10)
  return {
    postId,
    posts: state.entities.posts,
    loading: state.ui.loading,
  }
}

const mapDispatchToProps = (dispatch: GlobalDispatch) => ({
  fetchPost: (id: number) => dispatch(fetchPost(id, true)),
})

export type PostShowProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(PostShow)
