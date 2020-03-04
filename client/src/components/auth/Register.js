import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

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

const Register = () => {
  const classes = useStyles();
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  return (
    <Container maxWidth="sm">
      <form autoComplete="off" className={classes.formContainer}>
        <Grid container direction="column">
          <Grid item align="center" style={{ marginBottom: '2rem' }}>
            <Typography variant="h2">Create Account</Typography>
          </Grid>
          <Grid item>
            <TextField id="name" label="Full Name" fullWidth />
          </Grid>
          <Grid item>
            <TextField id="email" label="Email Address" fullWidth />
          </Grid>
          <Grid item>
            <TextField id="password" label="Password" fullWidth />
          </Grid>
          <Grid item>
            <TextField
              id="passwordConfirm"
              label="Password Confirm"
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginLeft: '0.4rem', marginTop: '1rem' }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Register;
