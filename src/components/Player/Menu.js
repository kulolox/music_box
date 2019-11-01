import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import LoopIcon from '@material-ui/icons/Loop';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

const useStyles = makeStyles(theme => ({
  menu: {}
}));

export default function Menu() {
  const classes = useStyles();
  const loop = false;
  const volume = 0.6;
  return (
    <div className={classes.menu}>
      <IconButton aria-label="previous">
        {volume !== 0 ? <VolumeUpIcon /> : <VolumeOffIcon />}
      </IconButton>
      <IconButton aria-label="previous">
        {loop ? <LoopIcon /> : <RepeatOneIcon />}
      </IconButton>
      <IconButton aria-label="previous">
        <PlaylistPlayIcon />
      </IconButton>
    </div>
  );
}
