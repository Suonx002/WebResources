import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { getPostsByCategory } from '../../../redux/actions/postActions';

import CategoryItem from './CategoryItem';

const useStyles = makeStyles(theme => ({
  containerButton: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  noResult: {
    marginTop: '4rem',
    border: '2px solid #eee',
    padding: '2rem',
    borderRadius: 5
  }
}));

const CategoryList = props => {
  const {
    posts: { posts },
    getPostsByCategory,
    match
  } = props;
  // console.log(props);
  const classes = useStyles();

  useEffect(() => {
    getPostsByCategory(match.params.category);

    // eslint-disable-next-line
  }, [match.params.category]);

  return (
    <Container maxWidth="md" style={{ marginTop: '5rem' }}>
      <div className={classes.containerButton}>
        <Button variant="outlined" color="primary" size="large">
          Create A Post
        </Button>
      </div>
      {posts !== null && posts.length === 0 && (
        <Typography
          align="center"
          variant="subtitle1"
          className={classes.noResult}
        >
          Sorry, there is no results with the following search. Please try
          something else :)
        </Typography>
      )}
      <List>
        {posts !== null &&
          posts.length > 0 &&
          posts.map(post => <CategoryItem key={post._id} post={post} />)}
      </List>
    </Container>
  );
};

const mapStateToProps = state => ({
  posts: state.post
});

const actions = {
  getPostsByCategory
};

export default connect(mapStateToProps, actions)(CategoryList);
