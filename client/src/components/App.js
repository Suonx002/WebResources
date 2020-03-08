import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';

import { ThemeProvider } from '@material-ui/core/styles';
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

const App = () => {
  useEffect(() => {
    if (localStorage.jwtToken) {
      setAuthorizationToken(localStorage.jwtToken);
      store.dispatch(loadUser());
    }
  }, []);

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
              <Route
                exact
                path="/category/:category"
                component={CategoryList}
              />
            </Switch>
          </Container>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
