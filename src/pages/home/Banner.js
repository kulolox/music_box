import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Swiper from '@src/components/Swiper';
import { getBanner } from '@src/utils/api/get';

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
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const type = 0;
      const result = await getBanner(type);
      console.log('result:', result.data.banners);
      setData(result.data.banners);
    };
    fetchData();
  }, []);
  if (data.length === 0) return null;
  return (
    <Swiper speed={3000} navigation>
      {data.map(item => (
        <div key={item.encodeId} className={classes.item}>
          <img src={item.imageUrl} alt="" />
        </div>
      ))}
    </Swiper>
  );
}
