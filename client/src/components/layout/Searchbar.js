import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  search: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem',
    border: '2px solid #eee;',
    width: '96%',
    margin: 'auto',
    marginBottom: '2rem',
    boxShadow: '0px 0.2rem 0.5rem rgba(0,0,0,0.2)'
  },
  searchIcon: {
    fontSize: '2rem',
    color: theme.palette.common.grey
  },
  searchInput: {
    height: 36,
    flexGrow: 1,
    padding: '1rem'
  }
}));

const Searchbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.search}>
      <div>
        <SearchIcon className={classes.searchIcon} />
      </div>
      <InputBase
        placeholder="Search for the language you want to learn: Javascript, React"
        inputProps={{ 'aria-label': 'search' }}
        className={classes.searchInput}
      />
    </div>
  );
};

export default Searchbar;
