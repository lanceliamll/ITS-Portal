import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getSubjectsByUserId } from "../../actions/subjectActions";

const AdminEditGrades = ({ getSubjectsByUserId, match, subject }) => {
  useEffect(() => {
    getSubjectsByUserId(match.params.id);
  }, [getSubjectsByUserId, match.params.id]);
  {
    console.log(match.params.id);
  }
  return <div>Edit Grades</div>;
};
AdminEditGrades.propTypes = {
  admin: PropTypes.object.isRequired,
  subject: PropTypes.object.isRequired,
  getSubjectsByUserId: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin,
  subject: state.subject
});

export default connect(
  mapStateToProps,
  { getSubjectsByUserId }
)(AdminEditGrades);
