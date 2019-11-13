import React, { useState } from 'react';
import { observer } from 'mobx-react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import Box from '@material-ui/core/Box';
import Badge from '@material-ui/core/Badge';
import Fade from '@material-ui/core/Fade';

import Mlist from './List';
import LyricBox from './LyricBox';
import { GlobalContext } from '@src/App';

const useStyles = makeStyles(theme => ({
  listContainer: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: 48,
    height: 400,
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
  const { audioData } = playerModel;
  return (
    <React.Fragment>
      <Fade in={showList}>
        <Box width={980} className={classes.listContainer}>
          <Mlist />
          <LyricBox />
        </Box>
      </Fade>

      <IconButton
        onClick={() => toggleList(prevState => !prevState)}
        aria-label="list"
      >
        <Badge badgeContent={audioData.length} color="secondary">
          <PlaylistPlayIcon />
        </Badge>
      </IconButton>
    </React.Fragment>
  );
});

export default AudioList;
