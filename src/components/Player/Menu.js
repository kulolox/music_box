import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import LoopIcon from '@material-ui/icons/Loop';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import Grid from '@material-ui/core/Grid';
import { observer } from 'mobx-react';

import Volume from '@components/Player/Volume';
import AudioList from '@components/Player/AudioList';
import PlayerContext from '@src/context/PlayerContext';

const useStyles = makeStyles(theme => ({
  menu: {
    '& svg': {
      color: theme.palette.common.white
    }
  }
}));

const Menu = observer(() => {
  const playerModel = React.useContext(PlayerContext);
  const classes = useStyles();
  const {
    status: { loop, volume }
  } = playerModel;

  const toggleLoop = () => {
    playerModel.toggleLoop();
  };
  const setVolume = e => {
    playerModel.setStatus({
      volume: parseFloat(e.target.value)
    });
  };

  return (
    <Grid container className={classes.menu}>
      <Grid item>
        <Volume value={volume} onChange={setVolume} />
      </Grid>
      <Grid item>
        <IconButton onClick={toggleLoop} aria-label="previous">
          {loop ? <LoopIcon /> : <RepeatOneIcon />}
        </IconButton>
      </Grid>
      <Grid item>
        <AudioList />
      </Grid>
    </Grid>
  );
});

export default Menu;
