import React from 'react';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineOutlinedIcon from '@material-ui/icons/PauseCircleOutlineOutlined';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Grid from '@material-ui/core/Grid';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  controls: {
    '& svg': {
      color: '#fff'
    }
  },
  disabled: {
    '& svg': {
      color: grey[600]
    }
  }
}));

const Controller = inject('playerModel')(
  observer(({ playerModel }) => {
    const classes = useStyles();
    const {
      status: { playing },
      hasPrevAudio,
      hasNextAudio
    } = playerModel;

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
      <Grid container className={classes.controls}>
        <Grid item>
          <IconButton
            className={!hasPrevAudio && classes.disabled}
            onClick={prevAudio}
            disabled={!hasPrevAudio}
            aria-label="previous"
          >
            <SkipPreviousIcon color="disabled" />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={togglePlay} aria-label="play/pause">
            {playing ? (
              <PauseCircleOutlineOutlinedIcon />
            ) : (
              <PlayCircleFilledWhiteOutlinedIcon />
            )}
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton
            className={!hasNextAudio && classes.disabled}
            onClick={nextAudio}
            disabled={!hasNextAudio}
            aria-label="next"
          >
            <SkipNextIcon />
          </IconButton>
        </Grid>
      </Grid>
    );
  })
);
export default Controller;
