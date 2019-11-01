import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const Propgress = withStyles({
  root: {
    color: '#666',
    height: 8,
    padding: '6px 0'
  },
  thumb: {
    height: 16,
    width: 16,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -4,
    marginLeft: -8,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit'
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)'
  },
  track: {
    height: 8,
    borderRadius: 4
  },
  rail: {
    height: 8,
    borderRadius: 4
  }
})(Slider);

export default Propgress;
