import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  heroImage: {
    height: 400,
    width: '100%',
    objectFit: 'cover',
    [theme.breakpoints.down('sm')]: {
      height: 300
    },
    [theme.breakpoints.down('xs')]: {
      height: 250
    }
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

const CategoryDetail = () => {
  const classes = useStyles();
  const theme = useTheme();

  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Container maxWidth="md">
      <Grid
        container
        direction="column"
        style={{ marginTop: '5rem' }}
        spacing={3}
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h3">The Modern Javascript Tutorial</Typography>
        </Grid>
        <Grid item>
          <img
            className={classes.heroImage}
            src="https://images.unsplash.com/photo-1583743220494-3da91330c2fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1200&q=80"
            alt="placeholder"
          />
        </Grid>
        <Grid item container direction="row" alignItems="center">
          <Grid item container xs>
            <Grid item>
              <img
                className={classes.authorImage}
                src="https://randomuser.me/api/portraits/women/70.jpg"
                alt="random user"
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1" style={{ marginLeft: '0.5rem' }}>
                Amy Dinh
              </Typography>
            </Grid>
          </Grid>
          <Grid item container xs justify="flex-end">
            <Button component={Link} to="/" color="primary" variant="contained">
              View Tutorial
            </Button>
          </Grid>
        </Grid>
        {/* Message */}
        <Grid item container direction="column">
          <form>
            <Grid item aligns="flex-start" style={{ marginBottom: '1rem' }}>
              <Typography variant="body1">Write a Post</Typography>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                multiline
                variant="outlined"
                rows="4"
                label="Message"
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
          <Grid item container className={classes.postContainer}>
            <Grid
              item
              container
              direction="column"
              xs
              style={{ maxWidth: 120 }}
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <img
                  className={classes.authorImage}
                  src="https://randomuser.me/api/portraits/women/65.jpg"
                  alt="random user 2"
                />
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" align="center">
                  Jessica Song
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs>
              <Typography
                variant="body1"
                align="left"
                style={{ marginLeft: '0.5rem' }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
                rerum incidunt eaque cumque laborum repellendus adipisci
                pariatur dolor, qui labore?
              </Typography>
            </Grid>
          </Grid>
          {/* next */}
          <Grid item container className={classes.postContainer}>
            <Grid
              item
              container
              direction="column"
              xs
              style={{ maxWidth: 120 }}
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <img
                  className={classes.authorImage}
                  src="https://randomuser.me/api/portraits/women/65.jpg"
                  alt="random user 2"
                />
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" align="center">
                  Jessica Song
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs>
              <Typography
                variant="body1"
                align="left"
                style={{ marginLeft: '0.5rem' }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia ut, nobis omnis corporis a voluptatum rerum pariatur
                consequatur qui sed enim ducimus illo voluptatibus ullam
                inventore iusto impedit molestias cum.
              </Typography>
            </Grid>
          </Grid>
          {/* next */}
          <Grid item container className={classes.postContainer}>
            <Grid
              item
              container
              direction="column"
              xs
              style={{ maxWidth: 120 }}
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <img
                  className={classes.authorImage}
                  src="https://randomuser.me/api/portraits/women/65.jpg"
                  alt="random user 2"
                />
              </Grid>
              <Grid item>
                <Typography variant="subtitle2" align="center">
                  Jessica Song
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs>
              <Typography
                variant="body1"
                align="left"
                style={{ marginLeft: '0.5rem' }}
              >
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
                numquam deserunt laudantium deleniti dolorem soluta harum
                repellat et optio delectus voluptatibus, facilis officia
                distinctio dolore fuga recusandae voluptate pariatur. Libero?
              </Typography>
            </Grid>
          </Grid>
          {/* next */}
        </Grid>
      </Grid>
    </Container>
  );
};

export default CategoryDetail;
