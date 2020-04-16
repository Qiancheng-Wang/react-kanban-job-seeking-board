import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useQuery } from "react-apollo";

import { VALIDATE_SERVICE } from "../queries";
import "./App.css";

import history from "../history";

import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";

const App = ({ refetch }) => {
  const { loading, error } = useQuery(VALIDATE_SERVICE);

  if (loading) {
    return (
      <div className="App">
        <h2>Loading Page</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <h2>Sevice Error Page</h2>
      </div>
    );
  }

  return (
    <Router history={history}>
      <Switch>
        <Route
          path="/"
          exact
          render={() => (
            <div className="App">
              <h2>Main Component</h2>
            </div>
          )}
        />
        <Route
          path="/signup"
          exact
          render={() => <SignUp refetch={refetch} />}
        />
        <Route
          path="/signin"
          exact
          render={() => <SignIn refetch={refetch} />}
        />

        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
