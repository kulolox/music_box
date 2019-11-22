import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { observer } from 'mobx-react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import InputRange from '@components/InputRange';
import Duration from './Duration';

import { GlobalContext } from '@src/App';

const useStyles = makeStyles(() => ({
  main: {
    width: 'calc(100% - 40px)'
  },
  allTime: {
    color: '#dcdcdc',
    '&::before': {
      content: '"/"',
      margin: '0 6px'
    }
  }
}));

const AudioInfo = observer(() => {
  const { playerModel } = React.useContext(GlobalContext);
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
    <Box display="flex" justify="space-between">
      <Box
        width={34}
        height={34}
        bgcolor="#ccc"
        marginRight="8px"
        borderRadius={4}
      />
      <Box className={classes.main}>
        <Box fontSize="12" mb="2" color="#fff">
          {name}
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
            <Duration seconds={duration * played} />
            <Duration className={classes.allTime} seconds={duration} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export default AudioInfo;
