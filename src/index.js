import { StrictMode } from "react";
import ReactDOM from "react-dom";
import UserProvider from "./components/UserProvider";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </StrictMode>,
  rootElement
);
