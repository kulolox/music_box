import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

import Album from '@src/pages/home/Album';
import Banner from '@src/pages/home/Banner';

export default function Home() {
  return (
    <Box pb={6}>
      <Container maxWidth="md">
        <Banner />
        <Album />
      </Container>
    </Box>
  );
}
