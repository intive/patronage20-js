import AboutMarta from './AboutMarta.jsx';
import { makeStyles } from '@material-ui/core/styles';

export default AboutMarta;

export const useStyles = makeStyles(theme => ({
  root: {
    color: '#fff',
    height: '100vh',
    display: 'flex',
    alignSelf: 'center',
    background: 'linear-gradient(113deg, #ff5edf 0%, rgba(13,156,147,1) 100%)'
  },
  large: {
    width: theme.spacing(25),
    height: theme.spacing(25)
  },
  particles: {
    position: 'fixed',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}));

export const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 650
      }
    }
  }
};
