import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
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

import useMediaQuery from '@material-ui/core/useMediaQuery';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';

import {
  likePost,
  dislikePost,
  currentPost,
  deletePost,
  getPostsByCategory
} from '../../../redux/actions/postActions';

const useStyles = makeStyles(theme => ({
  listItemContainer: {
    padding: '1.5rem',
    border: '2px solid #f8f8f8',
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
  },
  secondaryAction: {
    display: 'flex',
    flexDirection: 'column'
  },
  secondaryActionIcon: {
    padding: 6
  }
}));

const CategoryItem = props => {
  const classes = useStyles();
  const theme = useTheme();

  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

  const {
    currentPost,
    deletePost,
    handleDialogClick,
    match,
    post,
    likePost,
    dislikePost,
    getPostsByCategory,
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
          <IconButton
            disabled={
              user !== null && post !== null && user._id !== post.user
                ? false
                : true
            }
            style={{ padding: '2px' }}
            onClick={() => {
              // console.log(post.category);
              likePost(post._id);
              setTimeout(() => {
                getPostsByCategory(post.category);
              }, 1000);
            }}
          >
            <ExpandLessIcon className={classes.arrowUpIcon} />
          </IconButton>

          <span className={classes.upvotes}>{post.likes.length}</span>

          <IconButton
            disabled={
              user !== null && post !== null && user._id !== post.user
                ? false
                : true
            }
            style={{ padding: '2px' }}
            onClick={() => {
              // console.log(post.category);
              dislikePost(post._id);
              setTimeout(() => {
                getPostsByCategory(post.category);
              }, 1000);
            }}
          >
            <ExpandMoreIcon className={classes.arrowDownIcon} />
          </IconButton>
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
        <ListItemSecondaryAction
          className={matchesSM ? classes.secondaryAction : null}
        >
          {user !== null && post !== null && user._id === post.user && (
            <Fragment>
              <Tooltip title="Edit">
                <IconButton
                  onClick={handleEditClick}
                  className={matchesSM ? classes.secondaryActionIcon : null}
                >
                  <EditIcon color="secondary" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton
                  onClick={() => setDeleteDialog(true)}
                  className={matchesSM ? classes.secondaryActionIcon : null}
                >
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
                    onClick={() => {
                      deletePost(post._id);
                      setDeleteDialog(false);
                    }}
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
              <IconButton
                className={matchesSM ? classes.secondaryActionIcon : null}
              >
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
  deletePost,
  getPostsByCategory
};

export default connect(mapStateToProps, actions)(withRouter(CategoryItem));
