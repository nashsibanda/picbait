import React from "react";
import ReactDOM from "react-dom";
import configureStore from "../frontend/store/store";
import Root from "../frontend/components/root";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  let store;
  if (window.currentUser) {
    const preloadedState = {
      entities: {
        users: { [window.currentUser.slug]: window.currentUser },
      },
      session: { currentUser: window.currentUser.slug },
    };
    store = configureStore(preloadedState);
    const script = document.getElementById("current-user-bootstrap");
    script.remove();
  } else {
    store = configureStore();
  }
  ReactDOM.render(<Root store={store} />, root);
});
