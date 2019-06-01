import { Button } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/adminActions";

const useStyles = makeStyles({
  root: {
    width: "100%",

    overflowX: "auto"
  },
  table: {
    minWidth: 650
  }
});

const Students = ({ admin: { users }, getUsers }) => {
  const classes = useStyles();
  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Fragment>
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
                <TableCell align="right">{user && user.schoolId}</TableCell>
                <TableCell align="right">{user && user.firstName}</TableCell>
                <TableCell align="right">{user && user.lastName}</TableCell>
                <TableCell align="right">{user && user.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Fragment>
  );
};

Students.propTypes = {
  getUsers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(
  mapStateToProps,
  { getUsers }
)(Students);
