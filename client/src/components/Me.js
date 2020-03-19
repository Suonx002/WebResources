import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';

import {
  uploadProfile,
  updatePassword,
  clearError,
  clearStatus
} from '../redux/actions/authActions';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  input: {
    display: 'none'
  },
  textField: {
    marginBottom: '1rem'
  }
}));

const Me = props => {
  const {
    auth: { user, error, status },
    uploadProfile,
    updatePassword,
    clearError,
    clearStatus
  } = props;
  // console.log(user);
  const classes = useStyles();
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [userInput, setUserInput] = useState({
    password: '',
    passwordConfirm: '',
    currentPassword: ''
  });

  const { password, passwordConfirm, currentPassword } = userInput;

  const [snack, setSnack] = useState({
    open: false,
    Transition: Slide,
    vertical: 'top',
    horizontal: 'center'
  });

  const handleSubmit = e => {
    e.preventDefault();
    updatePassword({ password, passwordConfirm, currentPassword });
  };

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

  const handleInputChange = e => {
    setUserInput({
      ...userInput,
      [e.target.id]: e.target.value
    });
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        clearError();
      }, 4000);
    }

    if (status) {
      setUserInput({
        password: '',
        passwordConfirm: '',
        currentPassword: ''
      });
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
              {status.message}
            </Alert>
          </Snackbar>
        )}
        <Card style={{ padding: '3rem' }}>
          <Grid container direction="row">
            <Grid
              item
              container
              direction="column"
              alignItems="center"
              justify="center"
              sm
            >
              <Grid item>
                <Avatar src={user.avatar} className={classes.large} />
              </Grid>

              <Grid item>
                <Typography>
                  {user.name[0].toUpperCase() + user.name.slice(1)}
                </Typography>
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
            </Grid>
            <Grid item container direction="column" sm>
              {matchesSM ? <Divider /> : null}
              <form onSubmit={handleSubmit}>
                <Grid item>
                  <Typography
                    variant="h4"
                    align="center"
                    style={{
                      marginBottom: '2rem',
                      marginTop: matchesSM ? '2rem' : null
                    }}
                  >
                    Update Password
                  </Typography>
                </Grid>
                <Grid item className={classes.textField}>
                  <TextField
                    type="password"
                    id="currentPassword"
                    label="Current Password"
                    fullWidth
                    variant="outlined"
                    value={currentPassword}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item className={classes.textField}>
                  <TextField
                    type="password"
                    id="password"
                    label="Password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item className={classes.textField}>
                  <TextField
                    type="password"
                    id="passwordConfirm"
                    label="Password Confirm"
                    fullWidth
                    variant="outlined"
                    value={passwordConfirm}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item className={classes.textField}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    size="large"
                    disabled={!password || !currentPassword || !passwordConfirm}
                  >
                    Submit
                  </Button>
                </Grid>
              </form>
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

const actions = { uploadProfile, updatePassword, clearError, clearStatus };

export default connect(mapStateToProps, actions)(Me);
