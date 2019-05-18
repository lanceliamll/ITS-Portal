import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Link } from "react-router-dom";
import icctLogo from "../../static/icct-logo.png";
import "./Navbar.css";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

const Navbar = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Button color="inherit">
                <Link className="text-decoration" to="/">
                  <img
                    className="navbar-logo"
                    src={icctLogo}
                    alt="ICCT Student Portal"
                  />
                </Link>
              </Button>
            </Typography>
            {/* Navigation Buttons */}
            {/* {isAuthenticated ? authenticatedLinks : guestLinks} */}
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

export default Navbar;
