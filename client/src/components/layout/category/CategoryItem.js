import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import {
  likePost,
  dislikePost,
  currentPost,
  deletePost
} from '../../../redux/actions/postActions';

const useStyles = makeStyles(theme => ({
  listItemContainer: {
    padding: '1.5rem',
    border: '2px solid #eee',
    marginBottom: '0.5rem',
    transition: 'backgroundColor 0.3s',
    '&:hover': {
      backgroundColor: '#f4f4f4'
    }
  },
  title: {
    textDecoration: 'none',
    color: 'inherit',
    transition: 'all 0.3s',
    '&:hover': {
      color: theme.palette.common.blue,
      textDecoration: 'underline'
    }
  },
  listItemIcon: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    marginRight: '1rem'
  },
  arrowUpIcon: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.success.main
    }
  },
  arrowDownIcon: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.error.main
    }
  },
  upvotes: {
    marginTop: '0.2rem',
    color: theme.palette.common.grey
  },
  categorySpan: {
    marginRight: '0.5rem',
    border: `1px solid ${theme.palette.common.blue}`,
    padding: '0.25rem',
    color: theme.palette.common.blue
  }
}));

const CategoryItem = props => {
  const classes = useStyles();
  const {
    currentPost,
    deletePost,
    handleDialogClick,
    match,
    post,
    likePost,
    dislikePost,
    auth: { user }
  } = props;

  const [deleteDialog, setDeleteDialog] = useState(false);

  const handleEditClick = () => {
    currentPost(post);
    handleDialogClick();
  };

  return (
    post !== null && (
      <ListItem className={classes.listItemContainer}>
        <div className={classes.listItemIcon}>
          {user !== null && post !== null && user._id !== post.user && (
            <IconButton
              style={{ padding: '2px' }}
              onClick={() => likePost(post._id)}
            >
              <ExpandLessIcon className={classes.arrowUpIcon} />
            </IconButton>
          )}

          <span className={classes.upvotes}>{post.likes.length}</span>
          {user !== null && post !== null && user._id !== post.user && (
            <IconButton
              style={{ padding: '2px' }}
              onClick={() => dislikePost(post._id)}
            >
              <ExpandMoreIcon className={classes.arrowDownIcon} />
            </IconButton>
          )}
        </div>
        {/* <Link to={`/category/${match.params.category}/${1}`} >
      </Link> */}
        <ListItemText
          primary={
            post ? (
              <Link
                to={`/category/${match.params.category}/${post._id}`}
                className={classes.title}
              >
                {post.title}
              </Link>
            ) : null
          }
          secondary={
            post.tags
              ? post.tags.map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className={classes.categorySpan}
                  >
                    {tag}
                  </span>
                ))
              : null
          }
        />
        <ListItemSecondaryAction>
          {user !== null && post !== null && user._id === post.user && (
            <Fragment>
              <Tooltip title="Edit">
                <IconButton onClick={handleEditClick}>
                  <EditIcon color="secondary" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={() => setDeleteDialog(true)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </Tooltip>
              <Dialog
                fullWidth
                open={deleteDialog}
                onClose={() => setDeleteDialog(false)}
                aria-labelledby="form-dialog-delete"
              >
                <DialogTitle style={{ textAlign: 'center' }}>
                  Do You Want To Delete This Post ?
                </DialogTitle>
                <DialogActions>
                  <Button
                    onClick={() => setDeleteDialog(false)}
                    variant="outlined"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    onClick={() => deletePost(post._id)}
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </Fragment>
          )}
          <Tooltip title="Website Link">
            <a
              href={
                post.link.startsWith('http') ? post.link : `http://${post.link}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              <IconButton>
                <OpenInNewIcon color="primary" />
              </IconButton>
            </a>
          </Tooltip>
        </ListItemSecondaryAction>
      </ListItem>
    )
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const actions = {
  likePost,
  dislikePost,
  currentPost,
  deletePost
};

export default connect(mapStateToProps, actions)(withRouter(CategoryItem));
