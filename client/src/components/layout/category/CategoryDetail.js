import React, { useEffect, useState, Fragment } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Avatar from '@material-ui/core/Avatar';

import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';

import { getPostById } from '../../../redux/actions/postActions';
import {
  createComment,
  clearCommentError,
  getCommentsByPostId
} from '../../../redux/actions/commentActions';

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: '5rem'
  },
  description: {
    border: '2px solid #eee',
    marginBottom: '2rem',
    padding: '1rem',
    borderRadius: 5
  },
  authorImage: {
    height: 50,
    width: 50,
    borderRadius: 50
  },
  postContainer: {
    border: '2px solid #eee',
    borderRadius: 5,
    marginTop: '1rem',
    padding: '6px'
  }
}));

const CategoryDetail = props => {
  const {
    match,
    getPostById,
    createComment,
    getCommentsByPostId,
    clearCommentError,
    auth: { user },
    posts: { post },
    comments: { comments, status, error }
  } = props;

  // console.log(post);

  const classes = useStyles();
  const theme = useTheme();

  // const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const [commentInput, setCommentInput] = useState('');
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

  const handleCommentSubmit = e => {
    e.preventDefault();

    if (user !== null && post !== null) {
      createComment({
        comment: commentInput,
        user: user._id,
        post: post._id
      });
    }
  };

  useEffect(() => {
    getCommentsByPostId(match.params.categoryId);
    getPostById(match.params.categoryId);

    console.log('detail page');

    if (status === 'success') {
      setCommentInput('');
    }

    if (error) {
      setTimeout(() => {
        clearCommentError();
      }, 3000);
    }

    // eslint-disable-next-line
  }, [
    getPostById,
    getCommentsByPostId,
    match.params.categoryId,
    status,
    error
  ]);

  return (
    // error alerts
    <Fragment>
      <div className={classes.errorContainer}>
        {error !== null && error !== undefined && (
          <Snackbar
            anchorOrigin={{
              vertical: snack.vertical,
              horizontal: snack.horizontal
            }}
            open
            onClose={handleSnackClose}
            TransitionComponent={snack.Transition}
          >
            <Alert severity="error" onClose={handleSnackClose}>
              {error.message}
            </Alert>
          </Snackbar>
        )}
      </div>
      {post !== null && post !== undefined && (
        <Container maxWidth="md" className={classes.container}>
          {/* {post !== null && post !== undefined && ( */}
          <Grid container direction="column" spacing={3} alignItems="center">
            <Grid item>
              <Typography variant="h3">{post.title}</Typography>
            </Grid>
            <Grid item container direction="column">
              <Grid item>
                <Typography variant="h4">Summary</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body1" className={classes.description}>
                  {post.summary}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container direction="row" alignItems="center">
              <Grid item container direction="column" justify="flex-start" xs>
                <Grid item>
                  <Typography variant="h6" style={{ marginBottom: '1rem' }}>
                    Author
                  </Typography>
                </Grid>
                <Grid item style={{ marginLeft: '0.5rem', minWidth: 50 }}>
                  <Avatar src="https://randomuser.me/api/portraits/women/70.jpg"></Avatar>
                </Grid>
                <Grid item>
                  <Typography
                    variant="subtitle1"
                    // style={{ marginLeft: '0.5rem' }}
                    style={{ marginLeft: '0.5rem' }}
                  >
                    {post.user.name[0].toUpperCase() + post.user.name.slice(1)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item container xs justify="flex-end">
                <Button
                  color="primary"
                  variant="outlined"
                  target="_blank"
                  size={matchesXS ? 'small' : 'large'}
                  href={
                    post.link.startsWith('http')
                      ? post.link
                      : `http://${post.link}`
                  }
                >
                  View Tutorial
                </Button>
              </Grid>
            </Grid>
            {/* Comment */}
            <Grid item container direction="column">
              <form onSubmit={handleCommentSubmit}>
                <Grid item aligns="flex-start" style={{ marginBottom: '1rem' }}>
                  <Typography variant="h6">Write a Post</Typography>
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    multiline
                    variant="outlined"
                    rows="4"
                    label="Comment"
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                  />
                </Grid>
                <Grid
                  container
                  item
                  justify="flex-end"
                  style={{ marginTop: '1rem' }}
                >
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    fullWidth={matchesXS ? true : false}
                    size="large"
                  >
                    Submit
                  </Button>
                </Grid>
              </form>
            </Grid>
            {/* Comments */}
            <Grid item container direction="column">
              <Grid item>
                <Typography variant="h6" style={{ marginBottom: '1rem' }}>
                  Comments
                </Typography>
              </Grid>
              {comments !== null &&
                comments !== undefined &&
                comments.map(comment => {
                  // const date = new Date(comment.createdAt).toDateString();
                  const date = new Date(comment.createdAt).toLocaleString(
                    'en-US'
                  );

                  return (
                    <Grid
                      item
                      container
                      className={classes.postContainer}
                      key={comment._id}
                    >
                      <Grid
                        item
                        container
                        direction="column"
                        style={{ minWidth: 70, maxWidth: 120 }}
                      >
                        <Grid item align="center">
                          <Avatar src="https://randomuser.me/api/portraits/women/65.jpg" />
                        </Grid>
                        <Grid item>
                          <Typography variant="subtitle2" align="center">
                            {comment.user.name}
                          </Typography>
                        </Grid>
                      </Grid>
                      <Grid item xs>
                        <Typography
                          variant="body1"
                          align="left"
                          style={{ marginLeft: '0.5rem' }}
                        >
                          {comment.comment}
                        </Typography>
                      </Grid>
                      <Grid item container justify="flex-end">
                        <Grid item>
                          <Typography style={{ fontSize: '0.9rem' }}>
                            {date}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  );
                })}
            </Grid>
            {/* next */}
          </Grid>
        </Container>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  posts: state.post,
  comments: state.comment,
  auth: state.auth
});

const actions = {
  getPostById,
  createComment,
  getCommentsByPostId,
  clearCommentError
};

export default connect(mapStateToProps, actions)(CategoryDetail);
