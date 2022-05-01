import React from 'react'
import { connect } from 'react-redux'
import { loginRodrick } from '../../actions/session_actions'
import { GlobalDispatch } from '../../types/state'

type LoginRodrickProps = {
  loginRodrick: () => void
  className: string
}

const loginRodrickComponent = (props: LoginRodrickProps) => (
  <button type='button' onClick={props.loginRodrick} className={props.className}>
    Login as a demo user (Rodrick)
  </button>
)

const mapDispatchToProps = (dispatch: GlobalDispatch) => ({
  loginRodrick: () => dispatch(loginRodrick()),
})

export default connect(null, mapDispatchToProps)(loginRodrickComponent)
