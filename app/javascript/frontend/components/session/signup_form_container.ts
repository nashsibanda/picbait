import { connect } from 'react-redux'
import { signup } from '../../actions/session_actions'
import { GlobalDispatch, GlobalState } from '../../types/state'
import SessionForm, { SessionFormProps } from './session_form'

const mapStateToProps = (state: GlobalState): Pick<SessionFormProps, 'errors' | 'formType' | 'loading'> => ({
  errors: state.errors.session,
  formType: 'signup',
  loading: state.ui.loading.session,
})

const mapDispatchToProps = (dispatch: GlobalDispatch): Pick<SessionFormProps, 'processForm'> => ({
  processForm: user => dispatch(signup(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)
