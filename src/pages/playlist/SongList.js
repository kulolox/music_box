import React, { useCallback } from 'react';
import { observer } from 'mobx-react';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineOutlinedIcon from '@material-ui/icons/PauseCircleOutlineOutlined';

import Duration from '@components/Duration';
import LineEllipsis from '@components/LineEllipsis';
import { GlobalContext } from '@src/App';
import { Hidden } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 16
  }
}));

const SongList = observer(({ data }) => {
  const classes = useStyles();
  const { playerModel } = React.useContext(GlobalContext);
  const {
    index,
    status: { playing }
  } = playerModel;
  const playByIndex = useCallback(i => playerModel.playByIndex(i), [
    playerModel
  ]);

  return (
    <Card className={classes.container}>
      <CardContent>
        <Box display="flex" alignItems="flex-end" paddingLeft={2}>
          <Box fontSize={20} mr={4}>
            歌曲列表
          </Box>
          <Box>{data.tracks.length}首歌</Box>
        </Box>
        <List component="nav">
          {data.tracks.map((track, i) => (
            <ListItem
              selected={i === index}
              key={track.id}
              button
              onClick={() => playByIndex(i)}
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
              <Box fontSize="12px" pl={2} whiteSpace="nowrap">
                <span>{track.ar[0].name}</span>
              </Box>
              <Box fontSize="12px" pl={2}>
                <Duration seconds={track.dt / 1000} />
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
});

export default SongList;
