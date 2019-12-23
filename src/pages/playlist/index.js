import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { getPlaylist } from '@src/utils/api/get';
import useGetData from '@src/hooks/useGetData';

import Header from '@src/pages/playlist/Header';
import SongList from '@src/pages/playlist/SongList';
import Loading from '@src/components/Loading';

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
  return (
    <Container maxWidth="md" className={classes.details}>
      <Header data={data} />
      <SongList data={data} />
    </Container>
  );
}
