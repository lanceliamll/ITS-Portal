import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  auth: { isAuthenticated, loading },
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
