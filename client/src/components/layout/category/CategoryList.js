import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import { getPostsByCategory } from '../../../redux/actions/postActions';

import CategoryItem from './CategoryItem';
import CategoryDialog from './CategoryDialog';
import Alert from '@material-ui/lab/Alert';

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
  },
  progress: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const CategoryList = props => {
  const {
    posts: { posts, error },
    getPostsByCategory,
    match
  } = props;
  // console.log(props);
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  // console.log('running category list');

  useEffect(() => {
    getPostsByCategory(match.params.category);
    console.log('running in effect of category list');

    // eslint-disable-next-line
  }, [match.params.category]);

  return (
    <Container maxWidth="md" style={{ marginTop: '5rem' }}>
      {error && error.message === 'Post already liked' && (
        <Alert severity="error" style={{ marginBottom: '1rem' }}>
          {error.message}
        </Alert>
      )}
      {error && error.message === 'Post has not yet been liked' && (
        <Alert severity="warning" style={{ marginBottom: '1rem' }}>
          {error.message}
        </Alert>
      )}

      <div className={classes.containerButton}>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          onClick={handleClickOpen}
        >
          Create A Post
        </Button>
        <CategoryDialog open={openDialog} handleClose={handleClose} />
      </div>
      {posts === null ? (
        <div className={classes.progress}>
          <CircularProgress variant="determinate" />
        </div>
      ) : (
        posts !== null &&
        posts.length === 0 && (
          <Typography
            align="center"
            variant="subtitle1"
            className={classes.noResult}
          >
            Sorry, there is no results with the following search. Please try
            something else :)
          </Typography>
        )
      )}
      <List>
        {posts !== null &&
          posts.length > 0 &&
          posts.map(post => (
            <CategoryItem key={post._id} post={post} error={error} />
          ))}
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
