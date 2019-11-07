import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles(theme => ({
  list: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: 48,
    height: 400,
    background: 'rgba(0,0,0,.75)',
    borderRadius: '4px 4px 0 0',
    boxShadow: '0 -2px 4px 0 rgba(0,0,0,.2)'
  }
}));

const AudioList = inject('playerModel')(
  observer(({ playerModel }) => {
    const classes = useStyles();
    const [showList, toggleList] = useState(false);
    const {
      status: { loop, volume }
    } = playerModel;

    return (
      <React.Fragment>
        <Fade in={showList}>
          <Box width={980} className={classes.list}>
            123
          </Box>
        </Fade>

        <IconButton
          onClick={() => toggleList(prevState => !prevState)}
          aria-label="list"
        >
          <PlaylistPlayIcon />
        </IconButton>
      </React.Fragment>
    );
  })
);

export default AudioList;
