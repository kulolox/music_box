import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { getPlaylist } from '@utils/api/get';
import useGetData from '@src/hooks/useGetData';

import Header from '@pages/playlist/Header';
import SongList from '@pages/playlist/SongList';
import Loading from '@components/Loading';

const useStyles = makeStyles(() => ({
  details: {
    paddingBottom: 60
  }
}));

export default function Playlist(props) {
  const classes = useStyles();
  const { id } = props.match.params;
  const request = useCallback(() => getPlaylist(id), [id]);
  const data = useGetData(request);
  if (!data) return <Loading />;
  console.log('data:', data);
  return (
    <Container maxWidth="md" className={classes.details}>
      <Header data={data} />
      <SongList data={data} />
    </Container>
  );
}
