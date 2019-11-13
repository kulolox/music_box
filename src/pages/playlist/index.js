import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import { getPlaylist } from '@utils/api/get';
import useGetData from '@src/hooks/useGetData';

import Header from './Header';
import SongList from './SongList';

const useStyles = makeStyles(theme => ({
  details: {
    width: 960,
    margin: '0 auto',
    paddingBottom: 60
  }
}));

export default function Playlist(props) {
  const classes = useStyles();
  const { id } = props.match.params;
  const data = useGetData(getPlaylist, id);
  if (!data) return null;
  console.log('Playlist Data:', data);
  const { playlist } = data;
  return (
    <Card className={classes.details}>
      <Header data={playlist} />
      <SongList data={playlist} />
    </Card>
  );
}
