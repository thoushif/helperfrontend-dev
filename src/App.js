import { Home } from "./components/Home";
import { Signin } from "./components/Signin";
import "./styles.css";
import React, { Fragment, useContext } from "react";
import { UserContext } from "./components/UserProvider";
// import Home from "./components/Home";
import { AskSwitchProvider } from "./contexts/AskSwitchContext";

export default function App() {
  const user = useContext(UserContext);

  return (
    <div className="App">
      <Fragment>
        {!user ? (
          <Signin />
        ) : (
          <AskSwitchProvider>
            <Home />
          </AskSwitchProvider>
        )}
      </Fragment>
      {/* <Home /> */}
    </div>
  );
}
