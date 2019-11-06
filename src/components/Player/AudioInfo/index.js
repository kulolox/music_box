import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer, inject } from 'mobx-react';

import InputRange from '@components/Player/InputRange';
import Duration from './Duration';

const useStyles = makeStyles(theme => ({
  audioInfo: {
    display: 'flex',
    padding: '6px 0'
  },
  logo: {
    width: 34,
    height: 34,
    background: '#ccc',
    borderRadius: 4,
    marginRight: 16
  },
  main: {
    width: '100%'
  },
  name: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 2
  },
  progressBox: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  progress: {
    flex: 1,
    height: 2,
    background: '#000',
    position: 'relative'
  },
  loadProgress: {
    background: '#ccc',
    height: '100%'
  },
  timer: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 16,
    textAlign: 'center'
  },
  allTime: {
    color: '#dcdcdc',
    '&::before': {
      content: '"/"',
      margin: '0 6px'
    }
  }
}));

const AudioInfo = inject('playerModel')(
  observer(({ playerModel }) => {
    const classes = useStyles();
    const {
      status: { name, played, loaded, duration }
    } = playerModel;
    const onSeekMouseDown = () => {
      playerModel.seeking(true);
    };

    const onSeekChange = e => {
      playerModel.setStatus({
        played: parseFloat(e.target.value)
      });
    };

    const onSeekMouseUp = e => {
      playerModel.seeking(false);
      playerModel.player.seekTo(parseFloat(e.target.value));
    };
    return (
      <div className={classes.audioInfo}>
        <div className={classes.logo} />
        <div className={classes.main}>
          <div className={classes.name}>{name}</div>
          <div className={classes.progressBox}>
            <div className={classes.progress}>
              {/* 播放进度条 */}
              <InputRange
                min={0}
                max={1}
                value={played}
                onChange={onSeekChange}
                onMouseDown={onSeekMouseDown}
                onMouseUp={onSeekMouseUp}
              />
              {/* 加载进度条 */}
              <div
                className={classes.loadProgress}
                style={{ width: `${loaded * 100}%` }}
              />
            </div>
            <div className={classes.timer}>
              <Duration seconds={duration * played} />
              <Duration className={classes.allTime} seconds={duration} />
            </div>
          </div>
        </div>
      </div>
    );
  })
);

export default AudioInfo;
