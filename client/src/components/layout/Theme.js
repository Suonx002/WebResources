import { createMuiTheme } from '@material-ui/core/styles';

const arcBlue = '#0b72b9';
const arcOrange = '#ffba60';
const arcGrey = '#868686';

export default createMuiTheme({
  palette: {
    common: {
      blue: arcBlue,
      orange: arcOrange,
      grey: arcGrey
    },
    primary: {
      main: arcBlue
    },
    secondary: {
      main: arcOrange
    }
  },
  typography: {
    tab: {
      fontFamily: 'Raleway',
      textTransform: 'none',
      fontWeight: 700,
      fontSize: '1rem'
    },
    h2: {
      fontFamily: 'Raleway',
      fontWeight: 700,
      fontSize: '2.5rem',
      color: arcBlue
    },
    h3: {
      fontFamily: 'Raleway',
      fontSize: '1.75rem',
      color: arcBlue,
      fontWeight: 700
    },
    h4: {
      fontFamily: 'Raleway',
      fontSize: '1.25rem',
      color: arcBlue,
      fontWeight: 700
    },
    h6: {
      fontWeight: 500,
      fontFamily: 'Raleway',
      color: arcBlue,
      lineHeight: 1
    },
    subtitle1: {
      fontSize: '1.25rem',
      fontWeight: 300,
      color: arcGrey
    },
    subtitle2: {
      color: 'white',
      fontSize: '1.25rem',
      fontWeight: 300
    },
    body1: {
      fontSize: '1.25rem',
      color: arcGrey,
      fontWeight: 300
    }
  },
  overrides: {
    MuiTypography: {
      root: {
        marginTop: '0.5rem'
      }
    }
  }
});
