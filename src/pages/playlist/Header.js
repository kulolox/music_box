import React, { useCallback } from 'react';
import { observer } from 'mobx-react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';

import { getSongs } from '@src/utils/api/get';
import useGetData from '@src/hooks/useGetData';
import { GlobalContext } from '@src/App';

const useStyles = makeStyles(theme => ({
  header: {
    padding: 16,
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
    display: 'inline-block'
  },
  author: {
    margin: '16px 0'
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

const Header = observer(({ data }) => {
  const { playerModel } = React.useContext(GlobalContext);
  const classes = useStyles();
  const ids = data.trackIds.map(t => t.id).join(',');
  const request = useCallback(() => getSongs(ids), [ids]);
  const source = useGetData(request);
  if (!source) return null;
  const songList = data.tracks.map(t => {
    return {
      id: t.id,
      name: t.name,
      logo: t.al.picUrl,
      time: t.dt,
      singer: t.ar[0].name,
      url: source.data.find(o => o.id === t.id).url
    };
  });
  const setAudioData = () => {
    if (songList.length > 0) {
      // 添加缓存
      localStorage.setItem('songList', JSON.stringify(songList));
      playerModel.apply(songList);
    }
  };
  const togglePlay = () => {
    playerModel.togglePlay();
  };
  return (
    <Card className={classes.header}>
      <Grid container spacing={1}>
        <Grid xs={12} md={3} item>
          <div className={classes.logo}>
            <img src={data.coverImgUrl} alt="" />
          </div>
        </Grid>
        <Grid xs={12} md={9} item>
          <Box flex="1">
            <Box display="flex" alignItems="center">
              <Box mr={1}>
                <Chip
                  variant="outlined"
                  label="歌单"
                  color="secondary"
                  size="small"
                />
              </Box>
              <Box fontSize={20}>{data.name}</Box>
            </Box>
            <Typography className={classes.author}>
              {data.creator.nickname}
            </Typography>
            <ButtonGroup variant="contained" color="primary" size="small">
              <Button
                onClick={togglePlay}
                startIcon={<PlayCircleFilledWhiteOutlinedIcon />}
              >
                <Typography>播放</Typography>
              </Button>
              <Button onClick={setAudioData}>
                <AddOutlinedIcon />
              </Button>
            </ButtonGroup>
            <Box className={classes.tags}>
              <span>标签：</span>
              {data.tags.map((tag, i) => (
                <Chip
                  className={classes.tag}
                  key={i}
                  label={tag}
                  size="small"
                />
              ))}
            </Box>
            <Typography className={classes.desc}>{data.description}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
});

export default Header;
