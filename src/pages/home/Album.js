import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import HeadsetIcon from '@material-ui/icons/Headset';

import { getAlbum } from '@src/utils/api/get';
import useGetData from '@src/hooks/useGetData';

const useStyles = makeStyles(theme => ({
  label: {
    fontSize: 24,
    margin: '24px 0'
  },
  list: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: '0 -12px',
    paddingBottom: 24
  },
  item: {
    boxSizing: 'border-box',
    width: '25%',
    padding: '0 12px',
    marginBottom: 24,
    cursor: 'pointer',
    '& a': {
      color: '#333',
      textDecoration: 'none'
    }
  },
  name: {
    fontSize: 16
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

  const query = { limit: 12, order: 'hot' };
  const data = useGetData(getAlbum, query);

  if (!data) return null;
  const { playlists } = data;
  return (
    <React.Fragment>
      <div className={classes.label}>热门歌单</div>
      <div className={classes.list}>
        {playlists.map(item => (
          <div className={classes.item} key={item.id}>
            <Link className={classes.content} to={`/playlist/${item.id}`}>
              <div className={classes.cover}>
                <img src={item.coverImgUrl} alt="" />
                <div className={classes.playCount}>
                  <HeadsetIcon fontSize="small" />
                  <span>{item.playCount}</span>
                </div>
                <div className={classes.auth}>{item.creator.nickname}</div>
              </div>
              <div className={classes.name}>{item.name}</div>
            </Link>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
