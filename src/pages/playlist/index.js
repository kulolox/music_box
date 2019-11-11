import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import { getPlaylist } from '@utils/api/get';

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
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const { id } = props.match.params;
      const result = await getPlaylist(id);
      setData(result.data);
    };
    fetchData();
  }, []);
  if (!data) return null;
  const { playlist } = data;
  return (
    <Card className={classes.details}>
      <Header data={playlist} />
      <SongList data={playlist} />
    </Card>
  );
}
