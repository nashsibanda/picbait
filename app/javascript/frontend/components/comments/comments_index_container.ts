import { connect } from 'react-redux'
import { CommentEntity } from '../../types/entities'
import { CommentsState, GlobalState } from '../../types/state'
import CommentsIndex from './comments_index'

const mapStateToProps = (state: GlobalState) => ({
  users: state.entities.users,
})

export type CommentsIndexProps = Partial<ReturnType<typeof mapStateToProps>> & {
  comments: CommentsState | CommentEntity[]
  nested: boolean
  parentId?: number | null
  updateParent: (parentId: number, commenter: string) => any
}

export default connect(mapStateToProps, null)(CommentsIndex)
