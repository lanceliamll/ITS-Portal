import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions/authAction";
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

const Navbar = ({ auth: { isAuthenticated, loading, user }, logoutUser }) => {
  const classes = useStyles();

  const adminLinks = (
    <Fragment>
      <Button color="inherit">
        <Link className="text-decoration" to="/makeadmin">
          Admin
        </Link>
      </Button>
      <Button color="inherit">
        <Link className="text-decoration" to="/students">
          Students
        </Link>
      </Button>
      <Button color="inherit">
        <Link className="text-decoration" to="/admingetuser">
          Grades
        </Link>
      </Button>
    </Fragment>
  );

  const authenticatedLinks = (
    <div>
      {user !== null && user.isAdmin ? adminLinks : null}
      <Button color="inherit">
        <Link className="text-decoration" to="/profile">
          Profile
        </Link>
      </Button>
      <Button color="inherit">
        <Link className="text-decoration" to="/login" onClick={logoutUser}>
          Logout
        </Link>
      </Button>
    </div>
  );

  const guestLinks = (
    <div>
      <Button color="inherit">
        <Link className="text-decoration" to="/">
          Home
        </Link>
      </Button>
      <Button color="inherit">
        <Link className="text-decoration" to="/register">
          Register
        </Link>
      </Button>
      <Button color="inherit">
        <Link className="text-decoration" to="/login">
          Login
        </Link>
      </Button>
    </div>
  );

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
            {!loading && (
              <Fragment>
                {" "}
                {isAuthenticated ? authenticatedLinks : guestLinks}{" "}
              </Fragment>
            )}
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
