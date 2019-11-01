import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import SkipNextIcon from '@material-ui/icons/SkipNext';

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

export default function Controller() {
  const classes = useStyles();

  return (
    <div className={classes.controls}>
      <IconButton aria-label="previous">
        <SkipPreviousIcon />
      </IconButton>
      <IconButton aria-label="play/pause">
        <PlayCircleFilledWhiteOutlinedIcon className={classes.playIcon} />
      </IconButton>
      <IconButton aria-label="next">
        <SkipNextIcon />
      </IconButton>
    </div>
  );
}
