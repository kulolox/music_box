import React, { useCallback } from 'react';
import { observer } from 'mobx-react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Lyric from '@components/Player/Lyric';
import { getLyric } from '@src/utils/api/get';
import { GlobalContext } from '@src/App';
import useGetDataByAsyncCached from '@src/hooks/useGetDataByAsyncCached';

const useStyles = makeStyles(theme => ({
  head: {
    background: 'rgba(0,0,0,0.8)',
    padding: '8px 16px',
    textAlign: 'center'
  }
}));

const LyricBox = observer(() => {
  const { playerModel } = React.useContext(GlobalContext);
  const classes = useStyles();
  const {
    audioData,
    status: { index }
  } = playerModel;
  const id = audioData.length > 0 ? audioData[index].id : null;
  const request = useCallback(() => {
    return getLyric(id);
  }, [id]);
  // 歌词变动可能性不大，使用缓存
  const data = useGetDataByAsyncCached(request, `lyric${id}`, 1000000);
  if (!data) return null;
  const { lyric } = data.lrc;
  return (
    <Box width="50%" height="100%" color="#fff">
      <Box className={classes.head}>歌词</Box>
      <Box height="calc(100% - 36px)" position="relative">
        <Lyric lyric={lyric} />
      </Box>
    </Box>
  );
});

export default LyricBox;
