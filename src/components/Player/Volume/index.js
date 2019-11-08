import React, { Component } from 'react';
import PropTypes from 'prop-types';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';

import cssStyles from './index.module.scss';
import InputRange from '@components/InputRange';

class Volume extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired
  };

  state = {
    showVolumeRange: false
  };

  toggleVolumeRange = () => {
    this.setState(prevState => ({
      showVolumeRange: !prevState.showVolumeRange
    }));
  };

  onMouseUp = () => {
    this.setState({
      showVolumeRange: false
    });
  };

  render() {
    const { value, onChange } = this.props;
    const { showVolumeRange } = this.state;
    return (
      <div className={cssStyles.volume}>
        <Fade in={showVolumeRange}>
          <div className={cssStyles.volumeRange}>
            <div className={cssStyles.volumeProgress}>
              <InputRange
                min={0}
                max={1}
                value={value}
                onChange={onChange}
                onMouseUp={this.onMouseUp}
              />
            </div>
          </div>
        </Fade>
        <IconButton onClick={this.toggleVolumeRange} aria-label="volume">
          {value !== 0 ? <VolumeUpIcon /> : <VolumeOffIcon />}
        </IconButton>
      </div>
    );
  }
}

export default Volume;
