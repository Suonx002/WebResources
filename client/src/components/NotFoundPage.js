import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  notfound: {
    fontSize: 250,
    margin: '1rem 0',
    color: theme.palette.error.main,
    [theme.breakpoints.down('sm')]: {
      fontSize: 150
    }
  },
  subtitle: {
    fontSize: '1.6rem',
    marginBottom: '1rem',
    letterSpacing: 5,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.2',
      letterSpacing: 2
    }
  }
}));

const NotFoundPage = () => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      style={{ marginTop: '5rem' }}
      justify="center"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h2">Web Resources</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.notfound}>404</Typography>
      </Grid>
      <Grid item>
        <Typography className={classes.subtitle} variant="subtitle1">
          PAGE NOT FOUND{' '}
          <span role="img" aria-label="Sad Face">
            &#128557;
          </span>
        </Typography>
      </Grid>
      <Grid item>
        <Button component={Link} to="/" variant="contained" color="primary">
          GO TO HOME
        </Button>
      </Grid>
    </Grid>
  );
};

export default NotFoundPage;
