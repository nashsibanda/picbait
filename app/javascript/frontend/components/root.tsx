import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import App from "./App";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../../store";

const Root = ({ store }) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

export default Root;
