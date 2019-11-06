import React, { useRef } from 'react';
import ReactPlayer from 'react-player';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { inject, observer } from 'mobx-react';

import AudioInfo from './AudioInfo';
import Menu from './Menu';
import Controller from './Controller';

const useStyles = makeStyles(theme => ({
  card: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    background: 'linear-gradient(to top, rgba(0,0,0,.8), rgba(0,0,0,.6))',
    borderRadius: 0
  },
  realPlayer: {
    display: 'none'
  },
  content: {
    // height: 47,
    width: 980,
    margin: '0 auto'
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
      <Card className={classes.card}>
        <ReactPlayer
          className={classes.realPlayer}
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
        <div className={classes.content}>
          <Grid container spacing={1}>
            <Grid item xs={2}>
              {/* 播放功能区 */}
              <Controller />
            </Grid>
            <Grid item xs={8}>
              {/* 歌曲与进度 */}
              <AudioInfo />
            </Grid>
            <Grid item xs={2}>
              {/* 功能按钮区 */}
              <Menu />
            </Grid>
          </Grid>
        </div>
      </Card>
    );
  })
);

export default Player;
