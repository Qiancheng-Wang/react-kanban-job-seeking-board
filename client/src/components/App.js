import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { useQuery } from "react-apollo";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

import { VALIDATE_SERVICE } from "../queries";
import "./App.css";

import history from "../history";

import Navbar from "./Navbar/Navbar";
import Kanban from "./Kanban/Kanban";
import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import JobAdd from "./JobAdd/JobAdd";

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#3D70B2",
    },
  },
  overrides: {
    MuiTooltip: {
      tooltip: {
        fontSize: "16px",
        color: "#fffeee",
        backgroundColor: "#3D70B2",
      },
    },
  },
});

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
    <MuiThemeProvider theme={muiTheme}>
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
          <Route
            path="/job/add"
            render={() => <JobAdd refetch={refetch} session={session} />}
          />
          <Route
            path="/profile"
            render={() => (
              <div className="App">
                <h2>Profile Page</h2>
              </div>
            )}
          />

          <Redirect from="/" to="/signin" />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;
