import React from 'react';
import { observer } from 'mobx-react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Lyric from '@components/Player/Lyric';
import { getLyric } from '@src/utils/api/get';
import useGetData from '@src/hooks/useGetData';
import PlayerContext from '@src/context/PlayerContext';

const useStyles = makeStyles(theme => ({
  head: {
    background: 'rgba(0,0,0,0.8)',
    padding: '8px 16px',
    textAlign: 'center'
  }
}));

const LyricBox = observer(() => {
  const playerModel = React.useContext(PlayerContext);
  const classes = useStyles();
  const {
    audioData,
    status: { index }
  } = playerModel;
  // if (audioData.length === 0) return;
  const id = audioData[index] ? audioData[index].id : null;
  const data = useGetData(getLyric, id);
  if (!data) return null;
  const { lyric } = data.lrc;
  console.log('lyric:', lyric);
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
