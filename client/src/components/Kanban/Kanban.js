import React, { useEffect } from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

import history from "../../history";

const styles = (theme) => ({
  container: {
    width: "70%",
    minWidth: 800,
    maxWidth: 900,
  },
});

const Kanban = ({ classes, session }) => {
  useEffect(() => {
    if (session === null || !sessionStorage.token) {
      history.push("/signin");
    }
  }, [session]);

  return (
    <Container component="main" className={classes.container}>
      <CssBaseline />
    </Container>
  );
};

export default withStyles(styles)(Kanban);
