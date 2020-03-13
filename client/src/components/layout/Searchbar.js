import React, { useRef } from 'react';

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
    boxShadow: '0px 0.2rem 0.5rem rgba(0,0,0,0.2)',
    transition: 'all 0.3s',
    '&:active, &:hover': {
      transform: 'translateY(-3px)',
      boxShadow: '0px 0.2rem 0.5rem rgba(0,0,0,0.3)'
    }
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

const Searchbar = props => {
  const { filterCategory, clearFilterCategory } = props;
  const classes = useStyles();
  const text = useRef('');

  const handleChange = e => {
    if (text.current.value !== '') {
      filterCategory(e.target.value);
      // console.log(text);
    } else {
      clearFilterCategory();
    }
  };

  return (
    <div className={classes.search}>
      <div>
        <SearchIcon className={classes.searchIcon} />
      </div>
      <InputBase
        placeholder="Search for the language you want to learn: Javascript, React"
        inputProps={{ 'aria-label': 'search' }}
        className={classes.searchInput}
        ref={text}
        onChange={handleChange}
      />
    </div>
  );
};

export default Searchbar;
