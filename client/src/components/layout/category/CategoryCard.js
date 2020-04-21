import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

import sprite from './../../../img/sprite.svg';

const useStyles = makeStyles(theme => ({
  cardContainer: {
    minWidth: 250,
    display: 'flex',
    alignItems: 'center',
    padding: '1rem',
    transition: 'all 0.3s ease-in-out',
    boxShadow: '2px 4px 8px rgba(0,0,0,0.1)',
    '&:hover': {
      backgroundColor: '#eee',
      transform: 'translateY(-4px)'
    },
    [theme.breakpoints.down('md')]: {
      minWidth: 300
    },
    [theme.breakpoints.down('sm')]: {
      minWidth: 450
    },
    [theme.breakpoints.down('xs')]: {
      minWidth: 300
    }
  },
  svgIcon: {
    width: 50,
    height: 50
  },
  link: {
    textDecoration: 'none'
  }
}));

const CategoryCard = props => {
  const { icon, name, link } = props;
  // console.log(props);
  const classes = useStyles();

  return (
    <Link to={`/category/${link}`} className={classes.link}>
      <Card className={classes.cardContainer}>
        <svg className={classes.svgIcon}>
          <use href={`${sprite}#icon-${icon}`}></use>
        </svg>
        <Typography variant="h4" style={{ marginLeft: '0.5rem' }}>
          {name}
        </Typography>
      </Card>
    </Link>
  );
};

export default CategoryCard;
