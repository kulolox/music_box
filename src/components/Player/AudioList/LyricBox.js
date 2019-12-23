import React, { useCallback, useMemo } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Lyric from '@src/components/Player/Lyric';
import { getLyric } from '@src/utils/api/get';
import { GlobalContext } from '@src/App';
import useGetData from '@src/hooks/useGetData';

const useStyles = makeStyles(theme => ({
  head: {
    background: 'rgba(0,0,0,0.8)',
    padding: '8px 16px',
    textAlign: 'center'
  }
}));

const LyricBox = () => {
  const { playerModel } = React.useContext(GlobalContext);
  const classes = useStyles();
  const { song } = playerModel;
  const id = song ? song.id : null;
  const request = useCallback(() => {
    return getLyric(id);
  }, [id]);
  const data = useGetData(request, `lyric${id}`, 1000000);
  const lyric = useMemo(() => _.get(data, 'lrc.lyric', false), [data]);
  if (!data) return null;
  return (
    <Box flex="1" height="100%" color="#fff">
      <Box className={classes.head}>歌词</Box>
      <Box height="calc(100% - 36px)" position="relative">
        {lyric ? (
          <Lyric lyric={lyric} />
        ) : (
          <Box marginTop="35%" textAlign="center">
            暂无歌词
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default observer(LyricBox);
