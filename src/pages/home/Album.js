import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import HeadsetIcon from '@material-ui/icons/Headset';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { getAlbum } from '@src/utils/api/get';
import useGetData from '@src/hooks/useGetData';
import LineEllipsis from '@components/LineEllipsis';
import Loading from '@components/Loading';

const useStyles = makeStyles(theme => ({
  label: {
    fontSize: 24,
    margin: '24px 0'
  },
  item: {
    cursor: 'pointer',
    '& a': {
      color: '#333',
      textDecoration: 'none'
    }
  },
  cover: {
    position: 'relative',
    '& img': {
      width: '100%',
      display: 'block'
    }
  },
  auth: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 24,
    bottom: 0,
    paddingLeft: 8,
    lineHeight: '24px',
    background: 'linear-gradient(to top, rgba(0,0,0,.5), rgba(0,0,0,.4))',
    color: '#fff'
  },
  playCount: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: '2px 12px',
    background: 'linear-gradient(to left, rgba(0,0,0,.4), rgba(0,0,0,0))',
    color: '#fff',
    '& svg': {
      marginRight: 4,
      verticalAlign: 'middle'
    }
  }
}));

export default function Album() {
  const classes = useStyles();
  const limit = 24;
  const order = 'hot';
  const request = useCallback(() => {
    return getAlbum({
      limit,
      order
    });
  }, [limit, order]);
  const data = useGetData(request);
  if (!data) return <Loading />;
  const { playlists } = data;
  return (
    <React.Fragment>
      <div className={classes.label}>热门歌单</div>
      <Grid container spacing={1}>
        {playlists.map(item => (
          <Grid
            item
            xs={6}
            sm={3}
            md={2}
            className={classes.item}
            key={item.id}
          >
            <Link className={classes.content} to={`/playlist/${item.id}`}>
              <div className={classes.cover}>
                <img src={item.coverImgUrl} alt="" />
                <div className={classes.playCount}>
                  <HeadsetIcon fontSize="small" />
                  <span>{item.playCount}</span>
                </div>
                <div className={classes.auth}>{item.creator.nickname}</div>
              </div>
              <Box fontSize="13px" padding="8px 0">
                <LineEllipsis text={item.name} />
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
}
