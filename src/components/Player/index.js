import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import AudioInfo from './AudioInfo';
import Menu from './Menu';
import Controller from './Controller';

const useStyles = makeStyles(theme => ({
  card: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background:
      'linear-gradient(to top, rgba(200,200,200,.6), rgba(222,222,222,.6))',
    borderRadius: 0
  },
  content: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 47,
    width: 980,
    margin: '0 auto'
  }
}));

export default function Player() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.content}>
        {/* 播放功能区 */}
        <Controller />
        {/* 歌曲与进度 */}
        <AudioInfo />
        {/* 功能按钮区 */}
        <Menu />
      </div>
    </Card>
  );
}
