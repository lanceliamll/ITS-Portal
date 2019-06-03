import { Button, TextField } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUser, getUsers } from "../../actions/adminActions";
import "./Admin.css";

const useStyles = makeStyles({
  root: {
    width: "100%",

    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

const Students = ({ admin: { users, user }, getUsers, getUser }) => {
  const classes = useStyles();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const [userInput, setUserInput] = useState({
    userId: ""
  });

  const { userId } = userInput;

  const onChange = e => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  //Action
  const searchUser = () => {
    getUser(userId);
  };

  return (
    <Fragment>
      <div className="student-main">
        <h1>Student List</h1>
        <div>
          <div>
            <TextField
              type="user"
              label="Search"
              margin="normal"
              variant="outlined"
              name="userId"
              value={userId}
              onChange={e => onChange(e)}
            />
          </div>

          <Button onClick={searchUser} variant="contained" color="primary">
            {" "}
            Search
          </Button>
        </div>

        {users && user === null ? (
          <div className="student-main-table">
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Actions</TableCell>
                    <TableCell align="right">StudentID</TableCell>
                    <TableCell align="right">First Name</TableCell>
                    <TableCell align="right">Last Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={user && user._id}>
                      <TableCell component="th" scope="row">
                        <Button>Enroll</Button>
                      </TableCell>
                      <TableCell align="right">
                        {user && user.schoolId}
                      </TableCell>
                      <TableCell align="right">
                        {user && user.firstName}
                      </TableCell>
                      <TableCell align="right">
                        {user && user.lastName}
                      </TableCell>
                      <TableCell align="right">{user && user.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          </div>
        ) : (
          <div className="student-main-table">
            <Paper className={classes.root}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Actions</TableCell>
                    <TableCell align="right">StudentID</TableCell>
                    <TableCell align="right">First Name</TableCell>
                    <TableCell align="right">Last Name</TableCell>
                    <TableCell align="right">Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow key={user && user._id}>
                    <TableCell component="th" scope="row">
                      <Button>Enroll</Button>
                    </TableCell>
                    <TableCell align="right">{user && user.schoolId}</TableCell>
                    <TableCell align="right">
                      {user && user.firstName}
                    </TableCell>
                    <TableCell align="right">{user && user.lastName}</TableCell>
                    <TableCell align="right">{user && user.email}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </div>
        )}
      </div>
    </Fragment>
  );
};

Students.propTypes = {
  getUsers: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(
  mapStateToProps,
  { getUsers, getUser }
)(Students);
