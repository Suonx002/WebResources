import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, user },
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      // check if not login
      if (!isAuthenticated) {
        return <Redirect to="/login" />;
      }

      // authorized return component
      return <Component {...props} />;
    }}
  />
);

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(PrivateRoute);
