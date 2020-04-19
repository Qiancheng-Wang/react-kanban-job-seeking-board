import React, { useState } from "react";
import { ApolloConsumer } from "react-apollo";

import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import DashboardIcon from "@material-ui/icons/Dashboard";
import QueueIcon from "@material-ui/icons/Queue";
import AccountCircle from "@material-ui/icons/AccountCircle";

import history from "../../history";

import { navbuttons } from "../../constants";

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
  iconsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  navbarButton: {
    height: 72,
    width: 72,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    fontSize: 14,
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "#575d66",
    },
  },
  navbarButtonIcon: {
    fontSize: 30,
  },
  navbarButtonText: {
    marginTop: 2,
    fontSize: 14,
  },
};

const selectedBackgroundColor = "#0A83C4";

const Navbar = ({ classes }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [navbarIndex, setNavbarIndex] = useState(0);

  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = (client) => {
    sessionStorage.removeItem("token");
    client.resetStore();
  };

  const handleClickNarbarBtn = (index) => {
    if (index === navbarIndex) return;

    setNavbarIndex(index);
    if (navbuttons[index].url) {
      history.push(navbuttons[index].url);
    }
  };

  const handleRedirectProfile = () => {
    history.push("/profile");
  };

  return (
    <ApolloConsumer>
      {(client) => (
        <AppBar className={classes.appBar}>
          <Toolbar>
            <div className={classes.iconsContainer}>
              <div
                className={classes.navbarButton}
                style={{
                  backgroundColor: navbarIndex === 0 && selectedBackgroundColor,
                }}
                onClick={() => handleClickNarbarBtn(0)}
              >
                <DashboardIcon className={classes.navbarButtonIcon} />
                <div className={classes.navbarButtonText}>Kanban</div>
              </div>
              <div
                className={classes.navbarButton}
                style={{
                  backgroundColor: navbarIndex === 1 && selectedBackgroundColor,
                }}
                onClick={() => handleClickNarbarBtn(1)}
              >
                <QueueIcon className={classes.navbarButtonIcon} />
                <div className={classes.navbarButtonText}>Job Add</div>
              </div>
              <div className={classes.navbarButton} onClick={handleMenu}>
                <AccountCircle className={classes.navbarButtonIcon} />
                <div className={classes.navbarButtonText}>Menu</div>
              </div>
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
