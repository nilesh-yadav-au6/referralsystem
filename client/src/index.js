import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import 'react-notifications/lib/notifications.css';
import { NotificationContainer } from 'react-notifications';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <App />
        <NotificationContainer  />
      </HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
