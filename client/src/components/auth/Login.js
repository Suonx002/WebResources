import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

import { loginUser, clearError } from '../../redux/actions/authActions';

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

const Login = props => {
  const {
    auth: { error },
    loginUser,
    clearError
  } = props;

  // console.log(auth);

  const classes = useStyles();
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const handleChange = e => {
    setUser({
      ...user,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    loginUser({ email, password });
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        clearError();
      }, 2500);
    }
    // eslint-disable-next-line
  }, [error]);

  return (
    <Container maxWidth="sm">
      <form
        autoComplete="off"
        className={classes.formContainer}
        onSubmit={handleSubmit}
      >
        <Grid container direction="column">
          <Grid item align="center" style={{ marginBottom: '2rem' }}>
            <Typography variant="h2">Login Account</Typography>
          </Grid>
          <Grid item>
            {error !== null && (
              <Alert variant="filled" severity="error">
                {error.message}
              </Alert>
            )}
          </Grid>

          <Grid item>
            <TextField
              id="email"
              label="Email Address"
              fullWidth
              value={email}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="password"
              label="Password"
              fullWidth
              value={password}
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
              Login
            </Button>
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
  loginUser,
  clearError
};

export default connect(mapStateToProps, actions)(Login);
