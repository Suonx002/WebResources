import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import CategoryCard from './layout/category/CategoryCard';
import Grid from '@material-ui/core/Grid';
import Searchbar from './layout/Searchbar';
import Typography from '@material-ui/core/Typography';

import {
  filterCategory,
  clearFilterCategory
} from '../redux/actions/categoryActions';
// import categoryItems from './_data/categoryData';

const LandingPage = props => {
  // console.log('landing page');

  const {
    category: { category, filtered },
    filterCategory,
    clearFilterCategory
  } = props;

  useEffect(() => {
    // console.log('landing page');
    clearFilterCategory();
    // reload after login/register
  }, []);

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
  category: state.category
});

const actions = {
  filterCategory,
  clearFilterCategory
};

export default connect(mapStateToProps, actions)(LandingPage);
