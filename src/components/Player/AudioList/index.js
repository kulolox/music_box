import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Badge from '@material-ui/core/Badge';
import Fade from '@material-ui/core/Fade';

import Mlist from './List';
import LyricBox from './LyricBox';
import { GlobalContext } from '@src/App';

const useStyles = makeStyles(() => ({
  listContainer: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: 48,
    height: 400,
    maxWidth: 980,
    width: '100%',
    borderRadius: '4px 4px 0 0',
    boxShadow: '0 -2px 4px 0 rgba(0,0,0,.2)',
    overflow: 'hidden',
    display: 'flex',
    background: 'rgba(0,0,0,0.75)'
  }
}));

const AudioList = () => {
  const { playerModel } = React.useContext(GlobalContext);
  const classes = useStyles();
  const [showList, toggleList] = useState(false);
  const { length } = playerModel;

  const handleClick = React.useCallback(() => {
    if (length === 0) {
      alert('暂无歌曲');
    } else {
      toggleList(prevState => !prevState);
    }
  }, [length]);

  return (
    <React.Fragment>
      {length !== 0 && (
        <Fade in={showList}>
          <Box className={classes.listContainer}>
            <Mlist />
            <Hidden xsDown>
              <LyricBox />
            </Hidden>
          </Box>
        </Fade>
      )}

      <IconButton onClick={handleClick}>
        <Badge badgeContent={length} color="secondary">
          <PlaylistPlayIcon />
        </Badge>
      </IconButton>
    </React.Fragment>
  );
};

export default AudioList;
