import React from 'react';

import List from '@material-ui/core/List';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CategoryItem from './CategoryItem';

const useStyles = makeStyles(theme => ({}));

const CategoryList = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" style={{ marginTop: '5rem' }}>
      <List>
        <CategoryItem />
        <CategoryItem />
        <CategoryItem />
      </List>
    </Container>
  );
};

export default CategoryList;
