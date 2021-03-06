import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserSubject } from "../../actions/subjectActions";

const Grades = ({ getUserSubject, subject: { subject, loading }, match }) => {
  useEffect(() => {
    getUserSubject(match.params.id);
  }, [getUserSubject, match.params.id]);

  const [prelimInput] = useState({
    prelimTotalQuiz: 0,
    prelimTotalRecitation: 0,
    prelimTotalAssignment: 0,
    prelimClassStanding: 0,
    prelimGrade: 0
  });

  const [midtermInput] = useState({
    midtermTotalQuiz: 0,
    midtermTotalRecitation: 0,
    midtermTotalAssignment: 0,
    midtermClassStanding: 0,
    midtermClassAverage: 0,
    midtermGrade: 0
  });

  const [finalsInput] = useState({
    finalsTotalQuiz: 0,
    finalsTotalRecitation: 0,
    finalsTotalAssignment: 0,
    finalsClassStanding: 0,
    finalsClassAverage: 0,
    finalsGrade: 0
  });

  return loading && subject === null ? (
    <Fragment>Loading...</Fragment>
  ) : (
    <Fragment>
      <h1>Grades for {subject && subject.subjectName}</h1>
      <h2>Section: {subject && subject.sectionName}</h2>

      {/* {PRELIMINARIES} */}
      <h3>Preliminaries</h3>
      <p>Quizzes</p>
      <p>Quiz 1: {subject && subject.prelimQuiz1}</p>
      <p>Quiz 2: {subject && subject.prelimQuiz2}</p>
      <p>Quiz 3: {subject && subject.prelimQuiz3}</p>
      <p>
        Total Quiz:{" "}
        {subject &&
          (prelimInput.prelimTotalQuiz =
            (subject.prelimQuiz1 + subject.prelimQuiz2 + subject.prelimQuiz3) /
            3)}
      </p>
      <p>Recitations</p>
      <p>Recitation 1: {subject && subject.prelimRecitation1}</p>
      <p>Recitation 2: {subject && subject.prelimRecitation2}</p>
      <p>Recitation 3: {subject && subject.prelimRecitation3}</p>
      <p>
        Total Recitation:{" "}
        {subject &&
          (prelimInput.prelimTotalRecitation =
            (subject.prelimRecitation1 +
              subject.prelimRecitation2 +
              subject.prelimRecitation3) /
            3)}
      </p>
      <p>Assignment 1: {subject && subject.prelimAssignment1}</p>
      <p>Assignment 2: {subject && subject.prelimAssignment2}</p>
      <p>
        Total Assignments:{" "}
        {subject &&
          (prelimInput.prelimTotalAssignment =
            (subject.prelimAssignment1 + subject.prelimAssignment2) / 2)}
      </p>

      <p>Project: {subject && subject.prelimProject}</p>
      <p>
        Prelim Class Standing:{" "}
        {subject &&
          (prelimInput.prelimClassStanding =
            (prelimInput.prelimTotalAssignment +
              prelimInput.prelimTotalQuiz +
              prelimInput.prelimTotalRecitation) /
            3)}
      </p>
      <p>Prelim Examination: {subject && subject.prelimExam + 50}</p>
      <p>
        Prelim Grade:{" "}
        {subject &&
          (prelimInput.prelimGrade =
            (prelimInput.prelimTotalAssignment +
              prelimInput.prelimTotalRecitation +
              prelimInput.prelimTotalAssignment +
              prelimInput.prelimClassStanding +
              subject.prelimExam) /
            5)}
      </p>

      {/* {MIDTERMS} */}

      <h3>Midterms</h3>
      <p>Quizzes</p>
      <p>Quiz 1: {subject && subject.midtermQuiz1}</p>
      <p>Quiz 2: {subject && subject.midtermQuiz2}</p>
      <p>Quiz 3: {subject && subject.midtermQuiz3}</p>
      <p>
        Total Quiz:{" "}
        {subject &&
          (midtermInput.midtermTotalQuiz =
            (subject.midtermQuiz1 +
              subject.midtermQuiz2 +
              subject.midtermQuiz3) /
            3)}
      </p>
      <p>Recitations</p>
      <p>Recitation 1: {subject && subject.midtermRecitation1}</p>
      <p>Recitation 2: {subject && subject.midtermRecitation2}</p>
      <p>Recitation 3: {subject && subject.midtermRecitation3}</p>
      <p>
        Total Recitation:{" "}
        {subject &&
          (midtermInput.midtermTotalRecitation =
            (subject.midtermRecitation1 +
              subject.midtermRecitation2 +
              subject.midtermRecitation3) /
            3)}
      </p>
      <p>Assignment 1: {subject && subject.midtermAssignment1}</p>
      <p>Assignment 2: {subject && subject.midtermAssignment2}</p>
      <p>
        Total Assignments:{" "}
        {subject &&
          (midtermInput.midtermTotalAssignment =
            (subject.midtermAssignment1 + subject.midtermAssignment2) / 2)}
      </p>
      <p>Project: {subject && subject.midtermProject}</p>
      <p>
        Midterm Class Standing:{" "}
        {subject &&
          (midtermInput.midtermClassStanding =
            (midtermInput.midtermTotalAssignment +
              midtermInput.midtermTotalQuiz +
              midtermInput.midtermTotalRecitation) /
            3)}
        {console.log(midtermInput)}
      </p>
      <p>Midterm Examination: {subject && subject.midtermExam + 50}</p>
      <p>
        Class Average:{" "}
        {subject &&
          (midtermInput.midtermClassAverage =
            (prelimInput.prelimGrade + midtermInput.midtermClassStanding) / 2)}
        {console.log(
          prelimInput.prelimGrade,
          midtermInput.midtermClassStanding
        )}
      </p>
      <p>
        Midterm Grade:{" "}
        {subject &&
          (midtermInput.midtermGrade =
            (midtermInput.midtermTotalAssignment +
              midtermInput.midtermTotalRecitation +
              midtermInput.midtermTotalAssignment +
              midtermInput.midtermClassStanding +
              subject.midtermExam) /
            5)}
      </p>

      {/* {FINALS} */}

      <h3>Finals</h3>
      <p>Quizzes</p>
      <p>Quiz 1: {subject && subject.finalsQuiz1}</p>
      <p>Quiz 2: {subject && subject.finalsQuiz2}</p>
      <p>Quiz 3: {subject && subject.finalsQuiz3}</p>
      <p>
        Total Quiz:{" "}
        {subject &&
          (finalsInput.finalsTotalQuiz =
            (subject.finalsQuiz1 + subject.finalsQuiz2 + subject.finalsQuiz3) /
            3)}
      </p>
      <p>Recitations</p>
      <p>Recitation 1: {subject && subject.finalsRecitation1}</p>
      <p>Recitation 2: {subject && subject.finalsRecitation2}</p>
      <p>Recitation 3: {subject && subject.finalsRecitation3}</p>
      <p>
        Total Recitation:{" "}
        {subject &&
          (finalsInput.finalsTotalRecitation =
            (subject.finalsRecitation1 +
              subject.finalsRecitation2 +
              subject.finalsRecitation3) /
            3)}
      </p>
      <p>Assignment 1: {subject && subject.finalsAssignment1}</p>
      <p>Assignment 2: {subject && subject.finalsAssignment2}</p>
      <p>
        Total Assignments:{" "}
        {subject &&
          (finalsInput.finalsTotalAssignment =
            (subject.finalsAssignment1 + subject.finalsAssignment2) / 2)}
      </p>
      <p>Project: {subject && subject.finalsProject}</p>
      <p>
        Finals Class Standing:{" "}
        {subject &&
          (finalsInput.finalsClassStanding =
            (finalsInput.finalsTotalAssignment +
              finalsInput.finalsTotalQuiz +
              finalsInput.finalsTotalRecitation) /
            3)}
      </p>
      <p>Finals Examination: {subject && subject.finalsExam + 50}</p>
      <p>
        Class Average:{" "}
        {subject &&
          (finalsInput.finalsClassAverage =
            (prelimInput.prelimGrade +
              midtermInput.midtermGrade +
              finalsInput.finalsClassStanding) /
            3)}
      </p>
      <p>
        Final Grade:{" "}
        {subject &&
          (finalsInput.finalsGrade =
            (finalsInput.finalsTotalAssignment +
              finalsInput.finalsTotalRecitation +
              finalsInput.finalsTotalAssignment +
              finalsInput.finalsClassStanding +
              subject.finalsExam) /
            5)}
      </p>
    </Fragment>
  );
};

Grades.propTypes = {
  getUserSubject: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  subject: state.subject
});

export default connect(
  mapStateToProps,
  { getUserSubject }
)(Grades);
