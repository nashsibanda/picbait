import { connect } from 'react-redux'
import { logout } from '../../actions/session_actions'
import { GlobalDispatch, GlobalState } from '../../types/state'
import SessionGreeting from './session_greeting'

const mapStateToProps = (state: GlobalState) => {
  const { entities, session } = state
  return {
    currentUser: session.currentUser ? entities.users[session.currentUser.slug] : null,
  }
}

const mapDispatchToProps = (dispatch: GlobalDispatch) => ({
  logout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(SessionGreeting)
