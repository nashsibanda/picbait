import { ConnectedRouter } from 'connected-react-router'
import React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { history } from '../../store'
import { GlobalState } from '../types/state'
import App from './App'

const Root = ({ store }: { store: Store<GlobalState> }) => (
  <Provider store={store}>
    {/* @ts-ignore */}
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
)

export default Root
