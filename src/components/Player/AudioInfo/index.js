import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';

import InputRange from '@src/components/InputRange';
import Duration from '@components/Duration';
import desc_logo from '@src/assets/images/disc_logo.webp';
import '@src/assets/css/animate.scss';

import { GlobalContext } from '@src/App';

const useStyles = makeStyles(() => ({
  main: {
    width: 'calc(100% - 40px)',
    lineHeight: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  allTime: {
    color: '#dcdcdc',
    '&::before': {
      content: '"/"',
      margin: '0 6px'
    }
  },
  logo: {
    width: 34,
    height: 34,
    marginRight: 8
  },
  spin: {
    animation: 'rotate 2s linear infinite'
  }
}));

const AudioInfo = observer(() => {
  const { playerModel } = React.useContext(GlobalContext);
  const classes = useStyles();
  const {
    song,
    status: { played, loaded, duration, playing, playedSeconds }
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
    <Box display="flex" justify="space-between">
      <Avatar
        alt="desc logo"
        src={song ? song.logo : desc_logo}
        className={classNames(classes.logo, { [classes.spin]: playing })}
      />
      <Box className={classes.main}>
        <Box fontSize="12" mb="2" color="#fff">
          {song ? song.name : '暂无歌曲'}
        </Box>
        <Box display="flex" alignItems="center">
          <Box height={2} flex="1" bgcolor="#000" position="relative">
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
            <Box width={`${loaded * 100}%`} height="100%" bgcolor="#ccc" />
          </Box>
          {/* 时间显示器 */}
          <Box fontSize={12} color="#fff" ml={2} textAlign="center">
            <Duration seconds={playedSeconds} />
            <Duration className={classes.allTime} seconds={duration} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export default AudioInfo;
