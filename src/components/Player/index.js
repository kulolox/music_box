import React, { useRef } from 'react';
import ReactPlayer from 'react-player';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import AudioInfo from './AudioInfo';
import Menu from './Menu';
import Controller from './Controller';
import { GlobalContext } from '@src/App';

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

const Player = observer(() => {
  const { playerModel } = React.useContext(GlobalContext);
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
      <Container maxWidth="md">
        <Box display="flex" alignItems="center">
          <Box>
            <Controller />
          </Box>
          <Box flexGrow="1">
            <AudioInfo />
          </Box>
          <Box>
            <Menu />
          </Box>
        </Box>
      </Container>
    </Box>
  );
});

export default Player;
