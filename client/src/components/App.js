import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useQuery } from "react-apollo";

import { VALIDATE_SERVICE } from "../queries";
import "./App.css";

import history from "../history";

import Navbar from "./Navbar/Navbar";
import Kanban from "./Kanban/Kanban";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";

const App = ({ refetch, session }) => {
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

  const isAuthed = session && sessionStorage.token;

  return (
    <Router history={history}>
      {isAuthed && <Navbar />}
      <Switch>
        <Route
          path="/kanban"
          render={() => <Kanban refetch={refetch} session={session} />}
        />
        <Route
          path="/signup"
          render={() => <SignUp refetch={refetch} session={session} />}
        />
        <Route
          path="/signin"
          render={() => <SignIn refetch={refetch} session={session} />}
        />

        <Redirect from="/" to="/signin" />
      </Switch>
    </Router>
  );
};

export default App;
