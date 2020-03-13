import React, { useState, Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { logoutUser } from '../../redux/actions/authActions';

const ElevationScroll = props => {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0
  });
};

const useStyles = makeStyles(theme => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '1em'
  },
  appbar: {
    padding: '0.5rem 0',
    zIndex: theme.zIndex.modal + 1
  },
  logoContainer: {
    fontSize: '1.5rem',
    textTransform: 'none',
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  tabContainer: {
    marginLeft: 'auto'
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: 25
  },
  drawerIconContainer: {
    marginLeft: 'auto'
  },
  drawerIcon: {
    height: 40,
    width: 40,
    color: theme.palette.common.white
  },

  drawer: {
    backgroundColor: theme.palette.common.blue
  },
  drawerItem: {
    ...theme.typography.tab,
    color: 'white',
    opacity: '0.8'
  },
  drawerItemSelected: {
    '& .MuiListItemText-root': {
      opacity: 1
    }
  },
  listContainer: {
    width: 200
  },
  listItem: {
    textAlign: 'center'
  }
}));

const Header = props => {
  const {
    auth: { isAuthenticated, user },
    logoutUser
  } = props;
  const classes = useStyles();
  const theme = useTheme();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [openDrawer, setOpenDrawer] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleClick = () => {
    logoutUser();
  };

  const routes = [
    {
      name: 'Home',
      link: '/',
      activeIndex: 0
    },
    {
      name: 'Register',
      link: '/register',
      activeIndex: 1
    },
    {
      name: 'Login',
      link: '/login',
      activeIndex: 2
    }
  ];

  const authRoutes = [
    {
      name: 'Home',
      link: '/',
      activeIndex: 0
    },
    {
      name: `Hello, ${user !== null &&
        user.name[0].toUpperCase() + user.name.slice(1)}`,
      link: '/me',
      activeIndex: 1
    },
    {
      name: 'Logout',
      link: '/',
      activeIndex: 2,
      logout: handleClick
    }
  ];

  // console.log('testing app');

  useEffect(() => {
    switch (window.location.pathname) {
      case '/':
        if (value !== 0) {
          setValue(0);
        }
        break;
      case '/register':
        if (value !== 1) {
          setValue(1);
        }
        break;
      case '/login':
        if (value !== 2) {
          setValue(2);
        }
        break;
      case 'me':
        if (value !== 1) {
          setValue(1);
        }
        break;
      case '/logout':
        if (value !== 2) {
          setValue(2);
        }
        break;
      default:
        break;
    }
  }, [value, routes]);

  const tabs = isAuthenticated ? (
    <Tabs
      className={classes.tabContainer}
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
    >
      {authRoutes.map((route, index) => (
        <Tab
          key={`${route}-${index}`}
          className={classes.tab}
          label={route.name}
          component={Link}
          to={route.link}
          onClick={route.logout ? route.logout : null}
        />
      ))}
    </Tabs>
  ) : (
    <Tabs
      className={classes.tabContainer}
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
    >
      {routes.map((route, index) => (
        <Tab
          key={`${route}-${index}`}
          className={classes.tab}
          label={route.name}
          component={Link}
          to={route.link}
        />
      ))}
    </Tabs>
  );

  const drawer = (
    <Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />

        {isAuthenticated ? (
          <List disablePadding className={classes.listContainer}>
            {authRoutes.map((route, index) => (
              <ListItem
                className={classes.listItem}
                key={`${route}~${index}`}
                divider
                button
                component={Link}
                to={route.link}
                selected={value === route.activeIndex}
                classes={{ selected: classes.drawerItemSelected }}
                onClick={() => {
                  setOpenDrawer(false);
                  setValue(route.activeIndex);
                }}
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  {route.name}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        ) : (
          <List disablePadding className={classes.listContainer}>
            {routes.map((route, index) => (
              <ListItem
                className={classes.listItem}
                key={`${route}~${index}`}
                divider
                button
                component={Link}
                to={route.link}
                selected={value === route.activeIndex}
                classes={{ selected: classes.drawerItemSelected }}
                onClick={() => {
                  setOpenDrawer(false);
                  setValue(route.activeIndex);
                }}
              >
                <ListItemText className={classes.drawerItem} disableTypography>
                  {route.name}
                </ListItemText>
              </ListItem>
            ))}
          </List>
        )}
      </SwipeableDrawer>
      <IconButton
        onClick={() => setOpenDrawer(!openDrawer)}
        className={classes.drawerIconContainer}
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </Fragment>
  );

  return (
    <Fragment>
      <ElevationScroll>
        <AppBar position="fixed" color="primary" className={classes.appbar}>
          <Toolbar>
            <Button
              className={classes.logoContainer}
              // component={Link}
              // to="/"
              href="/"
              disableRipple
              onClick={() => setValue(0)}
            >
              Web Resources
            </Button>
            {matches ? drawer : tabs}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <div className={classes.toolbarMargin}></div>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

const actions = {
  logoutUser
};

export default connect(mapStateToProps, actions)(Header);
