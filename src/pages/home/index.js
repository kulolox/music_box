import React from 'react';
import Container from '@material-ui/core/Container';

import Album from './Album';
import Banner from './Banner';

export default function Home() {
  return (
    <Container maxWidth="md">
      <Banner />
      <Album />
    </Container>
  );
}
