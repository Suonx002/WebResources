import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import { getPostById } from '../../../redux/actions/postActions';

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: '5rem'
  },
  description: {
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
  }
}));

const CategoryDetail = props => {
  const {
    posts: { post },
    getPostById,
    match
  } = props;
  // console.log(props);
  // console.log(post);

  const classes = useStyles();
  const theme = useTheme();

  // const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

  useEffect(() => {
    getPostById(match.params.categoryId);
    // eslint-disable-next-line
  }, [match.params.categoryId]);

  return (
    <Container maxWidth="md" className={classes.container}>
      {post !== null && (
        <Grid container direction="column" spacing={3} alignItems="center">
          <Grid item>
            <Typography variant="h3">{post.title}</Typography>
          </Grid>
          <Grid item container>
            <Grid item>
              <Typography variant="h4">Summary</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" className={classes.description}>
                {post.summary}
              </Typography>
            </Grid>
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
                <Typography
                  variant="subtitle1"
                  style={{ marginLeft: '0.5rem' }}
                >
                  {post.user.name}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs justify="flex-end">
              <Button
                color="primary"
                variant="contained"
                target="_blank"
                href={post.link}
              >
                View Tutorial
              </Button>
            </Grid>
          </Grid>
          {/* Message */}
          <Grid item container direction="column">
            <form>
              <Grid item aligns="flex-start" style={{ marginBottom: '1rem' }}>
                <Typography variant="h6">Write a Post</Typography>
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
                  style={{ marginLeft: '0.5rem', hyphens: 'auto' }}
                >
                  Lorem ipsum dolor sit amet consec teadi isicing elit. Quas
                  rerum incidunt eaque cumque laborum repellendus adipisci
                  pariatur dolor, qui labore?
                </Typography>
              </Grid>
            </Grid>
            {/* next */}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

const mapStateToProps = state => ({
  posts: state.post
});

const actions = {
  getPostById
};

export default connect(mapStateToProps, actions)(CategoryDetail);
