import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import Album from '@src/pages/home/Album';
import Banner from '@src/pages/home/Banner';

const useStyles = makeStyles(() => ({
  home: {
    paddingBottom: 60
  }
}));

export default function Home() {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.home}>
      <Banner />
      <Album />
    </Container>
  );
}
