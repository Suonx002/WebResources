import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { IconButton } from '@material-ui/core';

const data = {
  title: 'The Modern JavaScript Tutorial',
  description:
    'Modern JavaScript Tutorial: simple, but detailed explanations with examples and tasks, including: closures, document and events, object oriented programming and more.',
  categoryList: ['Free', 'Beginner', 'Paid'],
  tutorialLink: 'https://javascript.info/',
  upvotes: 100
};

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
  arrowIcon: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.success.main
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
  const { match } = props;
  //   const [secondary, setSecondary] = useState(false);

  return (
    <ListItem className={classes.listItemContainer}>
      <div className={classes.listItemIcon}>
        <IconButton style={{ padding: '2px' }}>
          <ExpandLessIcon className={classes.arrowIcon} />
        </IconButton>
        <span className={classes.upvotes}>{data.upvotes}</span>
      </div>
      {/* <Link to={`/category/${match.params.category}/${1}`} >
      </Link> */}
      <ListItemText
        primary={
          data.title ? (
            <Link
              to={`/category/${match.params.category}/${1}`}
              className={classes.title}
            >
              {data.title}
            </Link>
          ) : null
        }
        secondary={
          data.categoryList
            ? data.categoryList.map((category, index) => (
                <span
                  key={`${category}-${index}`}
                  className={classes.categorySpan}
                >
                  {category}
                </span>
              ))
            : null
        }
      />

      <ListItemSecondaryAction>
        <a
          href={data.tutorialLink}
          target="_blank"
          rel="noopener noreferrer"
          className={classes.link}
        >
          <IconButton>
            <OpenInNewIcon color="primary" />
          </IconButton>
        </a>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default withRouter(CategoryItem);