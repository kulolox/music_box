import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Swiper from '@src/components/Swiper';
import NavTabs from './NavTabs';

const useStyles = makeStyles(theme => ({
  home: {
    position: 'relative',
    width: 980,
    margin: '0 auto'
  }
}));

export default function Home() {
  const classes = useStyles();
  return (
    <div className={classes.home}>
      <Swiper speed={3000} navigation>
        <div style={{ height: 300, background: 'green' }} />
        <div style={{ height: 300, background: 'blue' }} />
        <div style={{ height: 300, background: 'grey' }} />
      </Swiper>
      <NavTabs />
    </div>
  );
}
