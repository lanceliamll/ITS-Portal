import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserSubjects } from "../../actions/subjectActions";

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

const GradeItem = ({
  getUserSubjects,
  subjects: { subjectName, sectionName }
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="body2" component="p">
                Subject Name: <b>{subjectName}</b>
              </Typography>
              <Typography variant="body2" component="p">
                Section: <b>{sectionName}</b>
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">
                <Link to="/grade">View</Link>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

GradeItem.propTypes = {
  subject: PropTypes.object.isRequired,
  getUserSubjects: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  subject: state.subject
});

export default connect(
  mapStateToProps,
  { getUserSubjects }
)(GradeItem);
