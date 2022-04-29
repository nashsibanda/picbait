// Entry point for the build script in your package.json
import React from "react";
import ReactDOM from "react-dom";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

import configureStore from "./frontend/store/store";
import Root from "./frontend/components/root";
library.add(fas, faTwitter);
// Kicks off the process of finding <i> tags and replacing with <svg>
dom.watch();

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
