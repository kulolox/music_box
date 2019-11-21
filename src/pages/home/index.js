import React from 'react';
import Box from '@material-ui/core/Box';

import Album from './Album';
import Banner from './Banner';

export default function Home() {
  return (
    <Box width={980} mx="auto">
      <Banner />
      <Album />
    </Box>
  );
}
