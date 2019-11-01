import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Progress from './Progress';

const useStyles = makeStyles(theme => ({
  audioInfo: {
    margin: '0 24px',
    flex: 1,
    display: 'flex',
    alignItems: 'center'
  },
  logo: {
    width: 34,
    height: 34,
    background: '#ccc',
    borderRadius: 4,
    marginRight: 16
  },
  main: {
    boxSizing: 'border-box',
    padding: '6px 0',
    width: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  name: {
    color: '#666',
    fontSize: 12
  },
  progress: {
    display: 'flex',
    alignItems: 'center'
  },
  time: {
    marginLeft: 20
  }
}));

export default function AudioInfo() {
  const classes = useStyles();

  return (
    <div className={classes.audioInfo}>
      <div className={classes.logo} />
      <div className={classes.main}>
        <div className={classes.name}>莫失莫忘</div>
        <div className={classes.progress}>
          <Progress defaultValue={20} />
          <span className={classes.time}>00:00/03:16</span>
        </div>
      </div>
    </div>
  );
}
