import React from "react";
import ReactDOM from "react-dom";
import configureStore from "../frontend/store/store";
import Root from "../frontend/components/root";

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  let store;
  if (window.currentUser) {
    const { slug, id } = window.currentUser;
    const preloadedState = {
      entities: {
        users: { [slug]: window.currentUser },
      },
      session: { currentUser: { id: id, slug: slug } },
    };
    store = configureStore(preloadedState);
    const script = document.getElementById("current-user-bootstrap");
    script.remove();
  } else {
    store = configureStore();
  }
  ReactDOM.render(<Root store={store} />, root);
});
