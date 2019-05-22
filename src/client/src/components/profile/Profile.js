import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUserSubjects } from "../../actions/subjectActions";

const Profile = ({ getUserSubjects, auth, subject }) => {
  // useCallback(() => {
  //   getUserSubjects(auth.user.id);
  // }, [getUserSubjects]);

  useEffect(() => {
    getUserSubjects(auth.user._id);
  }, []);

  return <div />;
};

Profile.propTypes = {
  getUserSubjects: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  subject: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  subject: state.subject
});

export default connect(
  mapStateToProps,
  { getUserSubjects }
)(Profile);
