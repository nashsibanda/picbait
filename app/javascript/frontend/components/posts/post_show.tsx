import React from 'react'
import { connect } from 'react-redux'
import { match } from 'react-router'
import { fetchPost as fetchPostAction } from '../../actions/post_actions'
import { GlobalDispatch, GlobalState } from '../../types/state'
import PostInfo from './post_info'

class PostShow extends React.Component<PostShowProps> {
  constructor(props: PostShowProps) {
    super(props)
    this.loadPageData = this.loadPageData.bind(this)
  }

  componentDidMount() {
    this.loadPageData()
  }

  componentDidUpdate(prevProps: PostShowProps) {
    const { postId } = this.props
    if (postId !== prevProps.postId) {
      this.loadPageData()
    }
  }

  loadPageData() {
    const { fetchPost, postId } = this.props
    fetchPost(postId)
  }

  render() {
    const { posts, postId } = this.props
    const post = posts[postId]
    return <div className='post-show-container'>{post && <PostInfo post={post} />}</div>
  }
}

const mapStateToProps = (state: GlobalState, { match: matchOpbject }: { match: match<{ postId: string }> }) => {
  const postId = parseInt(matchOpbject.params.postId, 10)
  return {
    postId,
    posts: state.entities.posts,
    loading: state.ui.loading,
  }
}

const mapDispatchToProps = (dispatch: GlobalDispatch) => ({
  fetchPost: (id: number) => dispatch(fetchPostAction(id, true)),
})

export type PostShowProps = Required<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>>

export default connect(mapStateToProps, mapDispatchToProps)(PostShow)
