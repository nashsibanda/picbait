import React from 'react'
import { connect, ConnectedComponent } from 'react-redux'
import { Redirect, Route, withRouter } from 'react-router'
import { compose } from 'redux'
import { GlobalState } from '../types/state'

type RouteProps = {
  component: ConnectedComponent<any, any>
  path: string
  loggedIn: boolean
  exact: boolean
}

const Auth = ({ component: Component, path, loggedIn, exact }: RouteProps): React.ReactElement => (
  <Route path={path} exact={exact} render={props => (!loggedIn ? <Component {...props} /> : <Redirect to='/feed' />)} />
)

const Protected = ({ component: Component, path, loggedIn, exact }: RouteProps) => (
  <Route path={path} exact={exact} render={props => (loggedIn ? <Component {...props} /> : <Redirect to='/login' />)} />
)

const mapStateToProps = (state: GlobalState) => ({
  loggedIn: Boolean(state.session.currentUser),
})

export const AuthRoute = compose(withRouter, connect(mapStateToProps, null))(Auth) as ConnectedComponent<any, any>
export const ProtectedRoute = compose(withRouter, connect(mapStateToProps, null))(Protected) as ConnectedComponent<
  any,
  any
>
