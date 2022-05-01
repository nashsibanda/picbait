import React from 'react'
import { PostShowProps } from './posts_show_container'
import PostInfoContainer from './post_info_container'

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
    return <div className='post-show-container'>{post && <PostInfoContainer post={post} />}</div>
  }
}

export default PostShow
