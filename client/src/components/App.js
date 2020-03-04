import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './ui/Theme';

import Header from './ui/Header';
import LandingPage from './LandingPage';
import Register from './auth/Register';
import Login from './auth/Login';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
