import React, { Fragment } from 'react';
import CategoryCard from './ui/CategoryCard';
import Grid from '@material-ui/core/Grid';
import Searchbar from './ui/Searchbar';
import { Typography } from '@material-ui/core';

const LandingPage = () => {
  return (
    <Grid
      container
      justify="center"
      style={{ marginTop: '5rem' }}
      direction="column"
    >
      <Grid item style={{ marginBottom: '2rem' }}>
        <Typography variant="h2" align="center">
          Resources For the Best Programming Courses & Tutorials
        </Typography>
      </Grid>
      <Grid item>
        <Searchbar />
      </Grid>
      <Grid item container spacing={3} justify="center">
        <CategoryCard icon="html-5" name="HTML " link="html5" />
        <CategoryCard icon="css3" name="CSS" link="css" />
        <CategoryCard icon="javascript" name="Javascript" link="javascript" />
        <CategoryCard icon="react" name="React" link="react" />
        <CategoryCard icon="angularjs" name="Angular" link="angular" />
        <CategoryCard icon="vue-js" name="Vue" link="vue" />
        <CategoryCard icon="nodejs" name="Node.js" link="node" />
        <CategoryCard icon="mongodb" name="MongoDB" link="mongo" />
      </Grid>
    </Grid>
  );
};

export default LandingPage;
