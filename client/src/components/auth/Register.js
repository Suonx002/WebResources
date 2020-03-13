import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import uuid from 'uuid/v4';

import { registerUser, clearError } from '../../redux/actions/authActions';

const useStyles = makeStyles(theme => ({
  formContainer: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    },
    marginTop: '4rem',
    padding: '1.5rem 2.5rem 1.5rem 1.2rem ',
    border: `1.5px solid ${theme.palette.common.blue}`,
    borderRadius: '5px'
  }
}));

const Register = props => {
  console.log(props);
  const {
    auth: { error, isAuthenticated },
    registerUser,
    clearError,
    history
  } = props;
  // console.log(registerUser);

  const classes = useStyles();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const { name, email, password, passwordConfirm } = user;

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    registerUser({
      name,
      email,
      password,
      passwordConfirm
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/');
    }

    if (error) {
      setTimeout(() => {
        clearError();
      }, 2500);
    }
    // eslint-disable-next-line
  }, [isAuthenticated, error]);

  return (
    <Container maxWidth="sm">
      <form
        autoComplete="off"
        className={classes.formContainer}
        onSubmit={handleSubmit}
      >
        <Grid container direction="column">
          <Grid item align="center" style={{ marginBottom: '2rem' }}>
            <Typography variant="h2">Create Account</Typography>
          </Grid>

          <Grid item container direction="column">
            {error !== null &&
              error.message.split(',').map(alert => (
                <Grid item key={uuid()} style={{ marginBottom: '0.5rem' }}>
                  <Alert variant="filled" severity="error">
                    {alert}
                  </Alert>{' '}
                </Grid>
              ))}
          </Grid>
          <Grid item>
            <TextField
              id="name"
              label="Full Name"
              fullWidth
              value={name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              type="email"
              id="email"
              label="Email Address"
              fullWidth
              value={email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              id="password"
              label="Password"
              fullWidth
              value={password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              type="password"
              id="passwordConfirm"
              label="Password Confirm"
              fullWidth
              value={passwordConfirm}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginLeft: '0.4rem', marginTop: '1rem' }}
            >
              Register
            </Button>
          </Grid>
          <Grid
            item
            container
            direction="column"
            style={{ marginTop: '1rem' }}
            // justify="center"
            alignItems="flex-end"
          >
            <Grid item>
              <Typography>Already have an account ?</Typography>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                to="/login"
                component={Link}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const actions = {
  registerUser,
  clearError
};

export default connect(mapStateToProps, actions)(Register);
