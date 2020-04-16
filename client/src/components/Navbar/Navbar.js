import React, { useState } from "react";
import { ApolloConsumer } from "react-apollo";

import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import AccountCircle from "@material-ui/icons/AccountCircle";

const styles = {
  appBar: {
    backgroundColor: "#0C2E33",
    padding: 0,
    height: "72px",
    display: "flex",
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  iconsContainer: {},
};

const Navbar = ({ classes }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = (client) => {
    sessionStorage.removeItem("token");
    client.resetStore();
  };

  const handleRedirectProfile = () => {};

  return (
    <ApolloConsumer>
      {(client) => (
        <AppBar className={classes.appBar}>
          <Toolbar>
            <div className={classes.iconsContainer}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={handleRedirectProfile}>Profile</MenuItem>
                <MenuItem onClick={() => handleLogout(client)}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      )}
    </ApolloConsumer>
  );
};

export default withStyles(styles)(Navbar);
