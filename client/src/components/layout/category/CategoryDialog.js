import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';

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

const categoryOptions = [
  'html',
  'css',
  'javascript',
  'react',
  'angular',
  'vue',
  'node',
  'mongo'
];

const tagOptions = ['free', 'paid', 'beginner', 'book', 'video'];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const CategoryDialog = props => {
  console.log('run');
  const { open, handleClose } = props;

  const classes = useStyles();

  const [category, setCategory] = useState('');
  const [tag, setTag] = useState([]);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Create New Post</DialogTitle>
        <DialogContent>
          <DialogContentText>Please fill out all fields</DialogContentText>

          <Grid container direction="column">
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
                    {categoryOptions.map(item => (
                      <MenuItem key={item} value={item}>
                        {item[0].toUpperCase() + item.slice(1)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl variant="outlined">
                  <InputLabel id="tag">Tag</InputLabel>
                  <Select
                    style={{ width: 250 }}
                    labelId="tag"
                    id="tag"
                    multiple
                    value={tag}
                    onChange={e => setTag(e.target.value)}
                  >
                    {tagOptions.map(tag => (
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
                autoFocus
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
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CategoryDialog;
