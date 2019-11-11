import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { getSongDetails } from '@utils/api/get';

const useStyles = makeStyles(theme => ({}));

export default function Song(props) {
  const classes = useStyles();
  // console.log(props);
  // const [data, setData] = useState({});
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const { id } = props.match.params;
  //     const result = await getSongDetails(id);
  //     console.log('songDetails:', result.data);
  //     setData(result.data.playlists);
  //   };
  //   fetchData();
  // });
  return <div className={classes.details}>歌曲详情</div>;
}
