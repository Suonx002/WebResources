import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import Fab from '@material-ui/core/Fab';
import GitHubIcon from '@material-ui/icons/GitHub';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import theme from './layout/Theme';

import store from '../redux/reduxStore';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import { loadUser } from '../redux/actions/authActions';

import PrivateRoute from '../utils/PrivateRoute';

import Header from './layout/Header';
import LandingPage from './LandingPage';

import Register from './auth/Register';
import Login from './auth/Login';
import CategoryList from './layout/category/CategoryList';
import CategoryDetail from './layout/category/CategoryDetail';
import NotFoundPage from './NotFoundPage';
import Me from './Me';

const useStyles = makeStyles(theme => ({
  githubButton: {
    position: 'fixed',
    right: '2rem',
    bottom: '2rem',
    zIndex: '10000',
    [theme.breakpoints.down('sm')]: {
      right: '1rem',
      bottom: '1rem'
    }
  }
}));

const App = () => {
  const classes = useStyles();

  useEffect(() => {
    if (localStorage.jwtToken) {
      setAuthorizationToken(localStorage.jwtToken);
      store.dispatch(loadUser());
    }
  }, []);
  // console.log('running app');

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Container>
            <Switch>
              <Route exact path="/" component={LandingPage} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/me" component={Me} />
              <Route
                exact
                path="/category/:category"
                component={CategoryList}
              />
              <Route
                exact
                path="/category/:category/:categoryId"
                component={CategoryDetail}
              />
              <Route path="/error-404" component={NotFoundPage} />
              <Redirect to="/error-404" />
            </Switch>
          </Container>
          <Fab
            color="primary"
            aria-label="github"
            size="medium"
            className={classes.githubButton}
            href="https://github.com/Suonx002/WebResources"
            target="_blank"
          >
            <GitHubIcon style={{ fill: 'white' }} />
          </Fab>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
