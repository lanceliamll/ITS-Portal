import { Button, TextField } from "@material-ui/core";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { getUser } from "../../actions/adminActions";

const Enroll = ({ admin: { loading, user }, getUser }) => {
  const [userInput, setUserInput] = useState({
    userId: ""
  });

  const { userId } = userInput;

  const onChange = e => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const searchUser = () => {
    getUser(userId);
  };

  return (
    <Fragment>
      <p>{user && user.firstName}</p>
      <TextField
        type="user"
        label="Search"
        margin="normal"
        variant="outlined"
        name="userId"
        value={userId}
        onChange={e => onChange(e)}
      />
      <Button onClick={searchUser} variant="contained" color="primary">
        {" "}
        Nice
      </Button>
    </Fragment>
  );
};

Enroll.propTypes = {
  getUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(
  mapStateToProps,
  { getUser }
)(Enroll);
