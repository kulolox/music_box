import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { inject, observer } from 'mobx-react';

const useStyles = makeStyles(theme => ({
  controls: {
    display: 'flex',
    alignItems: 'center'
  },
  playIcon: {
    height: 32,
    width: 32
  }
}));

const Controller = inject('playerModel')(
  observer(({ playerModel }) => {
    const classes = useStyles();
    const togglePlay = () => {
      playerModel.togglePlay();
    };

    const prevAudio = () => {
      playerModel.prevAudio();
    };

    const nextAudio = () => {
      playerModel.nextAudio();
    };
    return (
      <div className={classes.controls}>
        <IconButton onClick={prevAudio} aria-label="previous">
          <SkipPreviousIcon />
        </IconButton>
        <IconButton onClick={togglePlay} aria-label="play/pause">
          <PlayCircleFilledWhiteOutlinedIcon className={classes.playIcon} />
        </IconButton>
        <IconButton onClick={nextAudio} aria-label="next">
          <SkipNextIcon />
        </IconButton>
      </div>
    );
  })
);
export default Controller;
