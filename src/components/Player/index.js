import React, { useRef } from 'react';
import ReactPlayer from 'react-player';
import { inject, observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import AudioInfo from './AudioInfo';
import Menu from './Menu';
import Controller from './Controller';

const useStyles = makeStyles(theme => ({
  player: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    background: 'linear-gradient(to top, rgba(0,0,0,.8), rgba(0,0,0,.6))',
    borderRadius: 0
  }
}));

const Player = inject('playerModel')(
  observer(({ playerModel }) => {
    const classes = useStyles();
    const {
      status: { url, playing, playbackRate, volume }
    } = playerModel;
    const playerRef = useRef(null);
    if (playerRef.current) {
      playerModel.setPlayer(playerRef.current);
    }
    const onProgress = state => {
      playerModel.onProgress(state);
    };
    const onDuration = duration => {
      playerModel.onDuration(duration);
    };
    const onEnded = () => {
      playerModel.onEnded();
    };
    return (
      <Box className={classes.player}>
        <Box display="none">
          <ReactPlayer
            ref={playerRef}
            url={url}
            playing={playing}
            playbackRate={playbackRate}
            volume={volume}
            onProgress={onProgress}
            onDuration={onDuration}
            onSeek={e => console.log('onSeek', e)}
            onEnded={onEnded}
          />
        </Box>
        <Box width={980} mx="auto">
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs={2}>
              <Controller />
            </Grid>
            <Grid item xs={8}>
              <AudioInfo />
            </Grid>
            <Grid item xs={2}>
              <Menu />
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  })
);

export default Player;
