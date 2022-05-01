import { connect } from 'react-redux'
import { login } from '../../actions/session_actions'
import { SessionUser } from '../../types/entities'
import { GlobalDispatch, GlobalState } from '../../types/state'
import SessionForm, { SessionFormProps } from './session_form'

const mapStateToProps = (state: GlobalState): Pick<SessionFormProps, 'errors' | 'formType' | 'loading'> => ({
  errors: state.errors.session,
  formType: 'login',
  loading: state.ui.loading.session,
})

const mapDispatchToProps = (dispatch: GlobalDispatch): Pick<SessionFormProps, 'processForm'> => ({
  processForm: (user: SessionUser) => dispatch(login(user)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)
