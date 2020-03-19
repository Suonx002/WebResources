import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import CategoryCard from './layout/category/CategoryCard';
import Grid from '@material-ui/core/Grid';
import Searchbar from './layout/Searchbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';

import { clearStatus } from '../redux/actions/authActions';

import {
  filterCategory,
  clearFilterCategory
} from '../redux/actions/categoryActions';
// import categoryItems from './_data/categoryData';

const useStyles = makeStyles(theme => ({
  title: {
    ...theme.typography.h2,
    [theme.breakpoints.down('md')]: {
      fontSize: '2.3rem'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '1.7rem'
    }
  }
}));

const LandingPage = props => {
  // console.log('landing page');

  const {
    category: { category, filtered },
    filterCategory,
    clearFilterCategory,
    auth: { status },
    clearStatus
  } = props;

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

  useEffect(() => {
    clearFilterCategory();

    if (status) {
      setTimeout(() => {
        clearStatus();
      }, 3000);
    }

    //eslint-disable-next-line
  }, [status]);

  return (
    <Grid
      container
      justify="center"
      style={{ marginTop: '5rem' }}
      direction="column"
    >
      {status !== null && status !== undefined && (
        <Grid item>
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
        </Grid>
      )}

      <Grid item style={{ marginBottom: '2rem' }}>
        <Typography align="center" className={classes.title}>
          Resources For the Best Programming Courses & Tutorials
        </Typography>
      </Grid>
      <Grid item>
        <Searchbar
          filterCategory={filterCategory}
          clearFilterCategory={clearFilterCategory}
        />
      </Grid>
      <Grid item container spacing={3} justify="center">
        {/* <CategoryCard icon="html-5" name="HTML " link="html5" />
        <CategoryCard icon="css3" name="CSS" link="css" />
        <CategoryCard icon="javascript" name="Javascript" link="javascript" />
        <CategoryCard icon="react" name="React" link="react" />
        <CategoryCard icon="angularjs" name="Angular" link="angular" />
        <CategoryCard icon="vue-js" name="Vue" link="vue" />
        <CategoryCard icon="nodejs" name="Node.js" link="node" />
        <CategoryCard icon="mongodb" name="MongoDB" link="mongo" /> */}

        {filtered !== null
          ? filtered.map((item, i) => (
              <Grid item key={`${item}-${i}`}>
                <CategoryCard
                  icon={item.icon}
                  name={item.name}
                  link={item.link}
                />
              </Grid>
            ))
          : category.map((item, i) => (
              <Grid item key={`${item}-${i}`}>
                <CategoryCard
                  icon={item.icon}
                  name={item.name}
                  link={item.link}
                />
              </Grid>
            ))}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = state => ({
  category: state.category,
  auth: state.auth
});

const actions = {
  filterCategory,
  clearFilterCategory,
  clearStatus
};

export default connect(mapStateToProps, actions)(LandingPage);
