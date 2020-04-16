import React, { useState, useEffect } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";

import history from "../../history";

import { useMutation } from "react-apollo";
import { SIGN_IN_USER } from "../../mutations";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link
        color="inherit"
        href="https://github.com/WrynnWang/react-kanban-job-seeking-board"
      >
        Wrynn Wang
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const SignIn = ({ classes, session, refetch }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (session !== null) {
      history.push("/kanban");
    }
  }, [session]);

  const [signinUser] = useMutation(SIGN_IN_USER);

  const isSubmitDisabled = !username || !password;

  const handleSignIn = () => {
    signinUser({ variables: { username, password } }).then(async ({ data }) => {
      sessionStorage.setItem("token", data.signIn.token);
      await refetch();
      history.push("/kanban");
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <div className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={username}
                autoComplete="Username"
                name="Username"
                variant="outlined"
                required
                fullWidth
                id="Username"
                label="User Name"
                autoFocus
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                value={password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={isSubmitDisabled}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default withStyles(styles)(SignIn);
