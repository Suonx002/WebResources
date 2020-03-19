import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';

import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';

import {
  uploadProfile,
  clearError,
  clearStatus
} from '../redux/actions/authActions';

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  input: {
    display: 'none'
  }
}));

const Me = props => {
  const {
    auth: { user, error, status },
    uploadProfile,
    clearError,
    clearStatus
  } = props;
  // console.log(user);
  const classes = useStyles();

  const [snack, setSnack] = useState({
    open: false,
    Transition: Slide,
    vertical: 'top',
    horizontal: 'center'
  });

  const handleSnackClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnack({
      ...snack,
      open: false
    });
  };

  const handleFileChange = e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('avatar', files[0]);

    uploadProfile(data);
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        clearError();
      }, 4000);
    }

    if (status) {
      setTimeout(() => {
        clearStatus();
      }, 4000);
    }
  }, [error, status]);

  return (
    user !== null &&
    user !== undefined && (
      <Container maxWidth="md" style={{ marginTop: '5rem' }}>
        {error !== null && error !== undefined && (
          <Snackbar
            anchorOrigin={{
              vertical: snack.vertical,
              horizontal: snack.horizontal
            }}
            open
            onClose={handleSnackClose}
            TransitionComponent={snack.Transition}
          >
            <Alert severity="error" onClose={handleSnackClose}>
              {error.message}
            </Alert>
          </Snackbar>
        )}

        {status !== null && status !== undefined && (
          <Snackbar
            anchorOrigin={{
              vertical: snack.vertical,
              horizontal: snack.horizontal
            }}
            open
            onClose={handleSnackClose}
            TransitionComponent={snack.Transition}
          >
            <Alert severity="success" onClose={handleSnackClose}>
              Upload New Profile Successfully!
            </Alert>
          </Snackbar>
        )}
        <Card style={{ padding: '3rem' }}>
          <Grid container direction="column">
            <Grid item container direction="column" alignItems="center">
              <Grid item>
                <Avatar src={user.avatar} className={classes.large} />
              </Grid>
              <Grid item>
                <input
                  accept="image/*"
                  id="button-file"
                  type="file"
                  className={classes.input}
                  onChange={handleFileChange}
                />
                <label htmlFor="button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                </label>
              </Grid>
              <Grid item>
                <Typography>
                  {user.name[0].toUpperCase() + user.name.slice(1)}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item></Grid>
            </Grid>
          </Grid>
        </Card>
      </Container>
    )
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const actions = { uploadProfile, clearError, clearStatus };

export default connect(mapStateToProps, actions)(Me);
