import Chip from "@material-ui/core/Chip";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import "./Alert.css";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map(alert => (
    <Chip
      key={alert.id}
      label={alert.msg}
      color={alert.alertType}
      className="upper-right"
    />
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
