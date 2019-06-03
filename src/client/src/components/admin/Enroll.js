import { Button, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { enrollStudent } from "../../actions/adminActions";

const Enroll = ({ enrollStudent, match, admin }) => {
  const [enrollInput, setEnrollInput] = useState({
    subjectName: "",
    sectionName: ""
  });

  const { subjectName, sectionName } = enrollInput;

  const onChange = e => {
    setEnrollInput({ ...enrollInput, [e.target.name]: e.target.value });
  };

  const onEnrollStudent = () => {
    if (subjectName && sectionName === "") {
      console.log("Empty Fields");
    } else {
      enrollStudent(match.params.id, subjectName, sectionName);
    }
  };

  return (
    <Fragment>
      <div>
        <TextField
          label="Subject"
          margin="normal"
          variant="outlined"
          name="subjectName"
          value={subjectName}
          onChange={e => onChange(e)}
        />
      </div>
      <div>
        <TextField
          label="Section"
          margin="normal"
          variant="outlined"
          name="sectionName"
          value={sectionName}
          onChange={e => onChange(e)}
        />
      </div>
      <div>
        <Button onClick={onEnrollStudent}>Enroll</Button>
      </div>
    </Fragment>
  );
};

Enroll.propTypes = {
  enrollStudent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(
  mapStateToProps,
  { enrollStudent }
)(Enroll);
