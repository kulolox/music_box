import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Swiper from '@src/components/Swiper';
import { getBanner } from '@src/utils/api/get';
import useGetData from '@src/hooks/useGetData';

const useStyles = makeStyles(theme => ({
  item: {
    cursor: 'pointer',
    position: 'relative',
    width: '100%',
    height: '100%',
    '& img': {
      display: 'block',
      width: '100%',
      height: '100%'
    }
  }
}));

export default function Banner() {
  const classes = useStyles();
  const data = useGetData(getBanner, 0);
  if (!data) return null;
  const { banners } = data;
  return (
    <Swiper speed={3000} navigation>
      {banners.map(item => (
        <div key={item.scm} className={classes.item}>
          <img src={item.imageUrl} alt="" />
        </div>
      ))}
    </Swiper>
  );
}
