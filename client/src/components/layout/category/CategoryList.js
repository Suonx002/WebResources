import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';

import {
  getPostsByCategory,
  clearCurrentPost
} from '../../../redux/actions/postActions';

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
    posts: { posts, error, current },
    auth: { isAuthenticated },
    getPostsByCategory,
    match,
    clearCurrentPost
  } = props;
  // console.log(props);
  const classes = useStyles();

  const [openDialog, setOpenDialog] = useState(false);
  const [snack, setSnack] = useState({
    open: false,
    Transition: Fade,
    vertical: 'top',
    horizontal: 'center'
  });
  const [openSnack, setOpenSnack] = useState(false);

  const { Transition, vertical, horizontal } = snack;

  // const handleSnackClick = () => {
  //   setOpenSnack(true);
  // };

  const handleSnackClose = (e, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const handleDialogClick = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleCreatePost = () => {
    clearCurrentPost();

    handleDialogClick();
  };

  useEffect(() => {
    // console.log('category list');
    getPostsByCategory(match.params.category);
    // console.log('running in effect of category list');
    // if (current) {
    //   clearCurrentPost();
    // }

    // eslint-disable-next-line
  }, [getPostsByCategory, match.params.category]);

  return (
    <Container maxWidth="md" style={{ marginTop: '5rem' }}>
      {/* Error handling */}
      {error && error.message === 'Post already liked' && (
        <Snackbar
          TransitionComponent={Transition}
          open
          onClose={handleSnackClose}
          autoHideDuration={4000}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert severity="error" style={{ marginBottom: '1rem' }}>
            {error.message}
          </Alert>
        </Snackbar>
      )}
      {error && error.message === 'Post has not yet been liked' && (
        <Snackbar
          TransitionComponent={Transition}
          open
          onClose={handleSnackClose}
          autoHideDuration={4000}
          anchorOrigin={{ vertical, horizontal }}
        >
          <Alert severity="warning" style={{ marginBottom: '1rem' }}>
            {error.message}
          </Alert>
        </Snackbar>
      )}

      {error &&
        error.message ===
          'You are not logged in to access this. Please log in to get access!' && (
          <Snackbar
            TransitionComponent={Transition}
            open
            onClose={handleSnackClose}
            autoHideDuration={4000}
            anchorOrigin={{ vertical, horizontal }}
          >
            <Alert severity="error" style={{ marginBottom: '1rem' }}>
              {error.message}
            </Alert>
          </Snackbar>
        )}

      <div className={classes.containerButton}>
        {isAuthenticated !== null && (
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={handleCreatePost}
          >
            Create A Post
          </Button>
        )}

        <CategoryDialog
          open={openDialog}
          handleDialogClose={handleDialogClose}
        />
      </div>
      {posts === null ? (
        <div className={classes.progress}>
          <CircularProgress variant="determinate" />
        </div>
      ) : (
        posts !== null &&
        posts.length === 0 && (
          <Grid
            container
            direction="column"
            alignItems="center"
            className={classes.noResult}
          >
            {isAuthenticated ? (
              <Grid item>
                <Typography align="center" variant="subtitle1">
                  Sorry, there are no results. Please create a new post! :)
                </Typography>
              </Grid>
            ) : (
              <Fragment>
                <Grid item>
                  <Typography align="center" variant="subtitle1">
                    Sorry, there are no results. Please login and create a new
                    post! :)
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    component={Link}
                    to="/login"
                    style={{ marginTop: '1rem', minWidth: 150 }}
                  >
                    Login
                  </Button>
                </Grid>
              </Fragment>
            )}
          </Grid>
        )
      )}
      <List>
        {/* List of items */}
        {posts !== null &&
          posts.length > 0 &&
          posts.map(post => (
            <CategoryItem
              key={post._id}
              post={post}
              error={error}
              handleDialogClick={handleDialogClick}
            />
          ))}
      </List>
    </Container>
  );
};

const mapStateToProps = state => ({
  posts: state.post,
  auth: state.auth
});

const actions = {
  getPostsByCategory,
  clearCurrentPost
};

export default connect(mapStateToProps, actions)(CategoryList);
