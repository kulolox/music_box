import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineOutlinedIcon from '@material-ui/icons/PauseCircleOutlineOutlined';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Grid from '@material-ui/core/Grid';
import { grey } from '@material-ui/core/colors';
import Hidden from '@material-ui/core/Hidden';

import { GlobalContext } from '@src/App';

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

const Controller = observer(() => {
  const { playerModel } = React.useContext(GlobalContext);
  const classes = useStyles();
  const {
    status: { playing },
    hasNextSong,
    hasPrevSong
  } = playerModel;

  const togglePlay = useCallback(() => playerModel.togglePlay(), [playerModel]);
  const prevSong = useCallback(() => playerModel.prevSong(), [playerModel]);
  const nextSong = useCallback(() => playerModel.nextSong(), [playerModel]);
  return (
    <Grid container className={classes.controls}>
      <Grid item>
        <Hidden xsDown>
          <IconButton
            className={!hasPrevSong ? classes.disabled : ''}
            onClick={prevSong}
            disabled={!hasPrevSong}
            aria-label="previous"
          >
            <SkipPreviousIcon color="disabled" />
          </IconButton>
        </Hidden>
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
      <Hidden xsDown>
        <Grid item>
          <IconButton
            className={!hasNextSong ? classes.disabled : ''}
            onClick={nextSong}
            disabled={!hasNextSong}
            aria-label="next"
          >
            <SkipNextIcon />
          </IconButton>
        </Grid>
      </Hidden>
    </Grid>
  );
});
export default Controller;
