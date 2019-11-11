import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';

import { getPlaylist } from '@utils/api/get';

import Header from './Header';

const useStyles = makeStyles(theme => ({
  details: {
    width: 960,
    margin: '0 auto',
    paddingBottom: 60
  },
  header: {
    padding: 24,
    display: 'flex',
    alignItems: 'flex-start',
    '& img': {
      display: 'block',
      width: 200
    }
  },
  logo: {
    border: '1px solid #dcdcdc',
    padding: 4,
    marginRight: 24
  },
  main: {},
  author: {
    marginBottom: 16
  },
  tags: {
    marginTop: 16,
    display: 'flex',
    alignItems: 'center'
  },
  tag: {
    margin: '0 4px'
  },
  desc: {
    fontSize: 14,
    marginTop: 16
  }
}));

export default function Playlist(props) {
  const classes = useStyles();
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const { id } = props.match.params;
      const result = await getPlaylist(id);
      console.log('data:', result.data);
      setData(result.data);
    };
    fetchData();
  }, []);
  if (!data) return null;
  const { playlist } = data;
  return (
    <div className={classes.details}>
      <Card>
        <Header data={playlist} />
        <Box display="flex" alignItems="flex-end" paddingLeft={2}>
          <Box fontSize={20} mr={4}>
            歌曲列表
          </Box>
          <Box>{playlist.tracks.length}首歌</Box>
        </Box>
        <List component="nav">
          {playlist.tracks.map((track, i) => (
            <ListItem key={track.dt} button>
              <Box width={30} mr={2}>
                {i + 1}
              </Box>
              <ListItemIcon>
                <PlayCircleFilledWhiteOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={track.name} />
            </ListItem>
          ))}
        </List>
      </Card>
    </div>
  );
}
