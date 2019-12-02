import React, { useState } from 'react';
import { observer } from 'mobx-react';

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

const AudioList = observer(() => {
  const { playerModel } = React.useContext(GlobalContext);
  const classes = useStyles();
  const [showList, toggleList] = useState(false);
  const { length } = playerModel;
  return (
    <React.Fragment>
      <Fade in={showList}>
        <Box className={classes.listContainer}>
          <Mlist />
          <Hidden xsDown>
            <LyricBox />
          </Hidden>
        </Box>
      </Fade>
      <IconButton onClick={() => toggleList(prevState => !prevState)}>
        <Badge badgeContent={length} color="secondary">
          <PlaylistPlayIcon />
        </Badge>
      </IconButton>
    </React.Fragment>
  );
});

export default AudioList;
