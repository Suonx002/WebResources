import React, { useState } from 'react';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';

import { uploadProfile } from '../redux/actions/authActions';

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10)
  },
  input: {
    display: 'none'
  }
}));

const Me = props => {
  const {
    auth: { user },
    uploadProfile
  } = props;
  // console.log(user);
  const classes = useStyles();

  // const [fileUpload, setFileUpload] = useState('');

  const handleFileChange = e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('avatar', files[0]);

    uploadProfile(data);
  };

  return (
    user !== null &&
    user !== undefined && (
      <Container maxWidth="md" style={{ marginTop: '5rem' }}>
        <Card style={{ padding: '3rem' }}>
          <Grid container direction="column">
            <Grid item container direction="column" alignItems="center">
              <Grid item>
                <Avatar src={user.avatar} className={classes.large} />
              </Grid>
              <Grid item>
                <input
                  accept="image/*"
                  id="button-file"
                  type="file"
                  className={classes.input}
                  onChange={handleFileChange}
                />
                <label htmlFor="button-file">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCameraIcon />
                  </IconButton>
                </label>
              </Grid>
              <Grid item>
                <Typography>
                  {user.name[0].toUpperCase() + user.name.slice(1)}
                </Typography>
              </Grid>
            </Grid>
            <Grid item container>
              <Grid item></Grid>
            </Grid>
          </Grid>
        </Card>
      </Container>
    )
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const actions = { uploadProfile };

export default connect(mapStateToProps, actions)(Me);
