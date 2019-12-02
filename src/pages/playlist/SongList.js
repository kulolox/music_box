import React from 'react';
import { observer } from 'mobx-react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineOutlinedIcon from '@material-ui/icons/PauseCircleOutlineOutlined';

import Duration from '@components/Duration';
import LineEllipsis from '@components/LineEllipsis';
import { GlobalContext } from '@src/App';
import { Hidden } from '@material-ui/core';

const SongList = observer(({ data }) => {
  const { playerModel } = React.useContext(GlobalContext);
  const {
    status: { index, playing }
  } = playerModel;
  return (
    <Card
      style={{
        marginTop: 16,
        padding: 16
      }}
    >
      <Box display="flex" alignItems="flex-end" paddingLeft={2}>
        <Box fontSize={20} mr={4}>
          歌曲列表
        </Box>
        <Box>{data.tracks.length}首歌</Box>
      </Box>
      <List component="nav">
        {data.tracks.map((track, i) => (
          <ListItem
            key={track.id}
            button
            onClick={() => playerModel.playByIndex(i)}
          >
            <Hidden xsDown>
              <Box width={30} mr={2}>
                {i + 1}
              </Box>
            </Hidden>
            <ListItemIcon>
              {index === i && playing ? (
                <PauseCircleOutlineOutlinedIcon />
              ) : (
                <PlayCircleFilledWhiteOutlinedIcon />
              )}
            </ListItemIcon>
            <ListItemText primary={<LineEllipsis text={track.name} />} />
            <Box fontSize="12px" padding="0 16px" whiteSpace="nowrap">
              <span>{track.ar[0].name}</span>
            </Box>
            <Box fontSize="12px" padding="0 16px">
              <Duration seconds={track.dt / 1000} />
            </Box>
          </ListItem>
        ))}
      </List>
    </Card>
  );
});

export default SongList;
