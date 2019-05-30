import { Button, TextField } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { getUser, makeUserAnAdmin } from "../../actions/adminActions";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    width: 10,
    height: 150,
    marginBottom: 12
  },

  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  root: {
    flexGrow: 1
  },
  paper: {
    textAlign: "center"
  }
});

const MakeAdmin = ({ admin: { loading, user }, getUser }) => {
  const classes = useStyles();
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

  const makeUserAdmin = () => {
    let confirmAdmin = window.confirm(
      "Are you sure do you want to make this user an Admin?"
    );
    if (confirmAdmin) {
      axios.post(`/api/user/makeadmin/${user._id}`);
      window.location.reload();
    }
  };

  const removeUserAdmin = () => {
    let confirmAdmin = window.confirm(
      "Are you sure do you want to remove this user as an Admin?"
    );
    if (confirmAdmin) {
      axios.post(`/api/user/removeadmin/${user._id}`);
      window.location.reload();
    }
  };

  return (
    <Fragment>
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

        <Button onClick={searchUser} variant="contained" color="primary">
          {" "}
          Nice
        </Button>
      </div>
      {user === null ? (
        <Fragment>Nothing to show</Fragment>
      ) : (
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={3}>
              <Card className={classes.card}>
                <CardContent>
                  <Typography variant="body2" component="p">
                    School ID: <b>{user && user.schoolId}</b>
                  </Typography>
                  <Typography variant="body2" component="p">
                    Name: <b>{user && user.firstName + " " + user.lastName}</b>
                  </Typography>
                </CardContent>
                <CardActions>
                  {user.isAdmin === true ? (
                    <Fragment>
                      <Button size="small" onClick={removeUserAdmin}>
                        Remove as Admin
                      </Button>
                    </Fragment>
                  ) : (
                    <Button size="small" onClick={makeUserAdmin}>
                      Make Admin
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </div>
      )}
    </Fragment>
  );
};

MakeAdmin.propTypes = {
  makeUserAnAdmin: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default connect(
  mapStateToProps,
  { makeUserAnAdmin, getUser }
)(MakeAdmin);
