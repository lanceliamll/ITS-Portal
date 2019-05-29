import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getUserSubjects } from "../../actions/subjectActions";
import GradeItem from "../grades/GradeItem";

const Profile = ({
  getUserSubjects,
  auth: { user },
  subject: { loading, subjects }
}) => {
  // useCallback(() => {
  //   getUserSubjects(auth.user.id);
  // }, [getUserSubjects]);

  useEffect(() => {
    getUserSubjects(user._id);
  }, [getUserSubjects, user._id]);

  return loading && subjects === [] ? (
    <Fragment>Loading...</Fragment>
  ) : (
    <Fragment>
      <h1>Profile</h1>
      <p>
        Name: <b>{user && user.lastName + ", " + user.firstName}</b>
      </p>
      <p>
        Student No. <b>{user && user.schoolId}</b>
      </p>
      <p>
        Email: <b>{user && user.email}</b>{" "}
      </p>

      <h1>Enrolled Subjects</h1>
      {subjects !== [] ? (
        <Fragment>
          {subjects.map(subject => (
            <GradeItem key={subject._id} subjects={subject} />
          ))}
        </Fragment>
      ) : (
        <Fragment>No Subjects has been enrolled to this student.</Fragment>
      )}
    </Fragment>
  );
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
