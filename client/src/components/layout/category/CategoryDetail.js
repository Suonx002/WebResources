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
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Alert from '@material-ui/lab/Alert';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import { getPostById } from '../../../redux/actions/postActions';
import {
  createComment,
  clearCommentError,
  getCommentsByPostId,
  updateComment,
  deleteComment,
  setCurrentComment,
  clearCurrentComment
} from '../../../redux/actions/commentActions';
import { DialogContent } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: '5rem'
  },
  summary: {
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
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  // new comment section
  cardContainer: {
    marginBottom: '1rem',
    [theme.breakpoints.down('xs')]: {
      maxWidth: '100%'
    }
  }
}));

const CategoryDetail = props => {
  const {
    match,
    getPostById,
    createComment,
    getCommentsByPostId,
    clearCommentError,
    setCurrentComment,
    updateComment,
    deleteComment,
    clearCurrentComment,
    auth: { isAuthenticated, user },
    posts: { post },
    comments: { comments, current, status, error }
  } = props;

  // console.log(post);

  const classes = useStyles();
  const theme = useTheme();

  // const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

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

  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  useEffect(() => {
    // set timeout for edit & delete comment
    setTimeout(() => {
      getCommentsByPostId(match.params.categoryId);
      getPostById(match.params.categoryId);
    }, 100);

    // console.log('detail page');

    if (status === 'success') {
      setCommentInput('');
    }

    if (current) {
      setCommentInput(current.comment);
    } else {
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
    current,
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
              <Typography variant="h2">{post.title}</Typography>
            </Grid>
            <Grid item container direction="column">
              <Card style={{ padding: '1rem' }}>
                <Grid item>
                  <Typography variant="h4">Summary</Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body1"

                    // className={classes.summary}
                  >
                    {post.summary}
                  </Typography>
                </Grid>
              </Card>
            </Grid>
            <Grid item container direction="row" alignItems="center">
              <Grid item container direction="column" justify="flex-start" xs>
                <Grid item>
                  <Typography variant="h4" style={{ marginBottom: '1rem' }}>
                    Author
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar
                    src={
                      post !== null && post !== undefined && post.user.avatar
                    }
                    className={classes.large}
                  ></Avatar>
                </Grid>

                <Grid item style={{ minWidth: 50, maxWidth: 200 }}>
                  <Typography
                    variant="subtitle1"
                    // style={{ marginLeft: '0.5rem' }}
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
                  size={matchesXS ? 'medium' : 'large'}
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
                  <Typography variant="h4">Write a Post</Typography>
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
                    helperText={
                      commentInput && commentInput.length < 20
                        ? 'Please provide at least 20 characters'
                        : false
                    }
                    error={
                      commentInput && commentInput.length < 20
                        ? 'Please provide at least 20 characters'
                        : false
                    }
                  />
                </Grid>
                <Grid
                  container
                  item
                  justify="flex-end"
                  style={{ marginTop: '1rem' }}
                >
                  {isAuthenticated !== null && isAuthenticated !== undefined ? (
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      fullWidth={matchesXS ? true : false}
                      size="large"
                      disabled={commentInput.length < 20 ? true : false}
                      // helper
                    >
                      Add Comment
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      fullWidth={matchesXS ? true : false}
                      size="large"
                      component={Link}
                      to="/login"
                      // helper
                    >
                      Login
                    </Button>
                  )}
                </Grid>
              </form>
            </Grid>
            {/* Comments */}
            <Grid item container direction="column">
              {comments !== null &&
                comments !== undefined &&
                comments.length > 0 && (
                  <Grid item>
                    <Typography variant="h4" style={{ marginBottom: '1rem' }}>
                      Comments
                    </Typography>
                  </Grid>
                )}

              <Grid item container direction="column">
                {comments !== null &&
                  comments !== undefined &&
                  comments.length > 0 &&
                  comments.map(comment => {
                    // const date = new Date(comment.createdAt).toDateString();
                    const date = new Date(comment.createdAt)
                      .toLocaleString('en-US')
                      .split(',');

                    return (
                      <Card key={comment._id} className={classes.cardContainer}>
                        <Grid item container direction="column">
                          <Grid item container>
                            {/* User image and name */}
                            <Grid
                              item
                              container
                              direction="column"
                              style={{
                                maxWidth: matchesXS ? 120 : 150,
                                padding: '0.5rem 0'
                              }}
                              justify="center"
                              alignItems="center"
                              xs
                            >
                              <Grid item>
                                <Avatar
                                  src={comment.user.avatar}
                                  className={classes.large}
                                />
                              </Grid>
                              <Grid item>
                                <Typography variant="subtitle2">
                                  {comment.user.name}
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid
                              item
                              container
                              direction="column"
                              alignItems="flex-end"
                              justify="center"
                              style={{
                                padding: '0.5rem'
                              }}
                              xs
                            >
                              <Grid item>
                                <Typography>{date[0]}</Typography>
                              </Grid>
                              <Grid item>
                                <Typography>{date[1]}</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Divider />
                          {/* Comments and buttons */}
                          <Grid item container direction="column">
                            {isAuthenticated !== null &&
                              isAuthenticated !== undefined &&
                              user !== null &&
                              user !== undefined &&
                              user._id === comment.user._id && (
                                <Grid item container justify="flex-end">
                                  <Grid item>
                                    <Tooltip title="Edit">
                                      <IconButton
                                        onClick={() => {
                                          setCurrentComment(comment);
                                          setEditDialog(true);
                                        }}
                                      >
                                        <EditIcon color="secondary" />
                                      </IconButton>
                                    </Tooltip>
                                  </Grid>
                                  <Grid item>
                                    <Tooltip title="Delete">
                                      <IconButton
                                        onClick={() => {
                                          setCurrentComment(comment);
                                          setDeleteDialog(true);
                                        }}
                                      >
                                        <DeleteIcon color="error" />
                                      </IconButton>
                                    </Tooltip>
                                  </Grid>
                                </Grid>
                              )}
                            <Grid item style={{ padding: '1rem' }}>
                              <Typography>{comment.comment}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Card>
                    );
                  })}
              </Grid>
            </Grid>
            {/* Edit dialog */}
            <Grid item>
              <Dialog
                aria-labelledby="Edit Comment Dialog"
                aria-describedby="Edit Comment Screen"
                fullWidth
                open={editDialog}
              >
                <DialogTitle style={{ textAlign: 'center' }}>
                  Edit Comment
                </DialogTitle>
                <DialogContent>
                  <TextField
                    placeholder="Comment"
                    fullWidth
                    multiline
                    rows="5"
                    label="Comment"
                    variant="outlined"
                    value={commentInput}
                    onChange={e => setCommentInput(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button color="primary" onClick={() => setEditDialog(false)}>
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      updateComment({
                        comment: commentInput,
                        postId: current.post._id,
                        commentId: current._id
                      });
                      clearCurrentComment();
                      setEditDialog(false);
                    }}
                    disabled={commentInput.length < 20 ? true : false}
                  >
                    Update
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
            {/* Delete dialog */}
            <Grid item>
              <Dialog
                aria-labelledby="Delete Comment Dialog"
                aria-describedby="Delete Comment Screen"
                fullWidth
                open={deleteDialog}
              >
                <DialogTitle style={{ textAlign: 'center' }}>
                  Do You Want To Delete This Comment ?
                </DialogTitle>
                <DialogActions>
                  <Button
                    color="primary"
                    onClick={() => setDeleteDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      deleteComment({
                        postId: current.post._id,
                        commentId: current._id
                      });
                      setDeleteDialog(false);
                    }}
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
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
  updateComment,
  deleteComment,
  clearCommentError,
  setCurrentComment,
  clearCurrentComment
};

export default connect(mapStateToProps, actions)(CategoryDetail);
