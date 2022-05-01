import { connect } from 'react-redux'
import { createPost } from '../../actions/post_actions'
import { AuthenticatedGlobalState, GlobalDispatch } from '../../types/state'
import PostForm from './post_form'

const mapStateToProps = (state: AuthenticatedGlobalState) => ({
  currentUser: state.session.currentUser,
  formType: 'new',
  errors: state.errors.post,
  posting: state.ui.posting,
})

const mapDispatchToProps = (dispatch: GlobalDispatch) => ({
  processForm: (formPost: FormData, userSlug: string) => dispatch(createPost(formPost, userSlug)),
})

export type PostFormProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
