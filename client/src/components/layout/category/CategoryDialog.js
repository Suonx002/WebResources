import React, { useState, useEffect } from 'react';
import uuid from 'uuid/v4';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

import {
  createPost,
  updatePost,
  clearPostError,
  clearPost
} from '../../../redux/actions/postActions';

const useStyles = makeStyles(theme => ({
  textField: {
    marginBottom: '1rem'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: 2
  }
}));

const tagsOptions = ['free', 'paid', 'beginner', 'book', 'video'];

const CategoryDialog = props => {
  const {
    open,
    handleDialogClose,
    createPost,
    updatePost,
    clearPostError,
    clearPost,
    post: { error, post, status, current },
    auth: { user },
    categories
  } = props;

  const classes = useStyles();

  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [link, setLink] = useState('');

  // copy the array and not make reference via stackoverflow
  // https://stackoverflow.com/questions/1069666/sorting-object-property-by-values
  const categoriesCopy = categories.category.slice(0);
  const categoriesSortedByName = categoriesCopy.sort((a, b) =>
    a.name < b.name ? -1 : a.name > b.name ? 1 : 0
  );

  // console.log(categoriesSortedByName);

  useEffect(() => {
    // if (status === 'success') {
    //   // setTitle('');
    //   // setTags([]);
    //   // setSummary('');
    //   // setLink('');
    //   // setCategory('');
    //   // handleDialogClose();

    //   window.location.reload();

    //   // setTimeout(() => {
    //   //   clearPost();
    //   // }, 1000);
    // }

    if (current) {
      setTitle(current.title);
      setTags(current.tags);
      setSummary(current.summary);
      setLink(current.link);
      setCategory(current.category);
    } else {
      setTitle('');
      setTags([]);
      setSummary('');
      setLink('');
      setCategory('');
    }

    if (error) {
      setTimeout(() => {
        clearPostError();
      }, 3000);
    }

    console.log('running in category dialog');

    // eslint-disable-next-line
  }, [current, status, error]);

  const handleSubmit = e => {
    e.preventDefault();

    createPost({
      title,
      tags,
      summary,
      link,
      category,
      user: user._id
    });

    handleDialogClose();
  };
  // console.log(post);

  const handleUpdateSumbit = e => {
    e.preventDefault();

    updatePost({
      title,
      tags,
      summary,
      link,
      category,
      id: current._id
    });

    handleDialogClose();
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleDialogClose}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={current ? handleUpdateSumbit : handleSubmit}>
        <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
          {current !== null ? 'Edit Post' : 'Create New Post'}
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Please fill out all fields</DialogContentText> */}
          <Grid container direction="column">
            <Grid item container direction="column">
              {error !== null &&
                error.message.split(',').map(alert => (
                  <Grid item key={uuid()} style={{ marginBottom: '0.5rem' }}>
                    <Alert variant="filled" severity="error">
                      {alert}
                    </Alert>{' '}
                  </Grid>
                ))}
            </Grid>

            <Grid item className={classes.textField}>
              <TextField
                autoFocus
                id="title"
                label="Title"
                type="text"
                fullWidth
                variant="outlined"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </Grid>
            <Grid item className={classes.textField}>
              <TextField
                fullWidth
                multiline
                id="sumarry"
                variant="outlined"
                rows="4"
                label="Summary"
                value={summary}
                onChange={e => setSummary(e.target.value)}
              />
            </Grid>
            <Grid
              item
              container
              justify="space-between"
              className={classes.textField}
            >
              <Grid item>
                <FormControl variant="outlined">
                  <InputLabel id="category">Category</InputLabel>
                  <Select
                    style={{ width: 250 }}
                    labelId="category"
                    id="category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    {categoriesSortedByName.map((item, i) => (
                      <MenuItem key={`${item}-${i}`} value={item.link}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant="outlined">
                  <InputLabel id="tags">Tags</InputLabel>
                  <Select
                    style={{ width: 250 }}
                    labelId="tags"
                    id="tags"
                    multiple
                    value={tags}
                    onChange={e => setTags(e.target.value)}
                  >
                    {tagsOptions.map(tag => (
                      <MenuItem key={tag} value={tag}>
                        {tag[0].toUpperCase() + tag.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid item className={classes.textField}>
              <TextField
                id="link"
                label="Tutorial URL"
                type="text"
                fullWidth
                variant="outlined"
                value={link}
                onChange={e => setLink(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} variant="outlined">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained">
            {current !== null ? 'Update' : 'Add Post'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  categories: state.category
});

const actions = {
  createPost,
  updatePost,
  clearPostError,
  clearPost
};

export default connect(mapStateToProps, actions)(CategoryDialog);
