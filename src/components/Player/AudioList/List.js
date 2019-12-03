import React, { useCallback } from 'react';
import { observer } from 'mobx-react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';

import ScrollBarContainer from '@components/ScrollBarContainer';
import { GlobalContext } from '@src/App';
import Duration from '@components/Duration';
import LineEllipsis from '@components/LineEllipsis';

const useStyles = makeStyles(() => ({
  head: {
    background: 'rgba(0,0,0,0.8)',
    padding: '8px 16px',
    textAlign: 'center'
  },
  icon: {
    minWidth: 30
  }
}));

const Mlist = observer(() => {
  const { playerModel } = React.useContext(GlobalContext);
  const classes = useStyles();
  const { lists, index } = playerModel;
  const playByIndex = useCallback(i => playerModel.playByIndex(i), [
    playerModel
  ]);
  return (
    <Box flex="1" minWidth="300px" height="100%" color="#fff">
      <Box className={classes.head}>歌曲列表</Box>
      <Box height="calc(100% - 36px)" position="relative">
        <ScrollBarContainer>
          <List component="nav">
            {lists.map((data, i) => (
              <ListItem key={data.id} onClick={() => playByIndex(i)} button>
                <ListItemIcon className={classes.icon}>
                  {index === i ? (
                    <PlayArrowRoundedIcon
                      fontSize="small"
                      style={{ color: 'red' }}
                    />
                  ) : (
                    <span />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box fontSize="14px">
                      <LineEllipsis text={data.name} />
                    </Box>
                  }
                />
                <Box fontSize="12px" pl={2} whiteSpace="nowrap">
                  <span>{data.singer}</span>
                </Box>
                <Box fontSize="12px" pl={1}>
                  <Duration seconds={data.time / 1000} />
                </Box>
              </ListItem>
            ))}
          </List>
        </ScrollBarContainer>
      </Box>
    </Box>
  );
});

export default Mlist;
