import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Album from './Album';
import Banner from './Banner';

const useStyles = makeStyles(theme => ({
  home: {
    position: 'relative',
    width: 980,
    margin: '0 auto'
  }
}));

export default function Home() {
  const classes = useStyles();
  // return false;
  return (
    <div className={classes.home}>
      <Banner />
      <Album />
    </div>
  );
}
