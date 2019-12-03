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
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';

import { getSongs } from '@src/utils/api/get';
import useGetData from '@src/hooks/useGetData';
import { GlobalContext } from '@src/App';
import Loading from '@src/components/Loading';
import { checkMusic } from '@src/utils/tools';

const useStyles = makeStyles(theme => ({
  logo: {
    border: '1px solid #dcdcdc',
    padding: 4,
    display: 'inline-block',
    '& img': {
      display: 'block',
      width: 200
    }
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
    margin: theme.spacing(0.5)
  },
  desc: {
    marginTop: 16
  }
}));

const Header = observer(({ data }) => {
  const { playerModel } = React.useContext(GlobalContext);
  const { playlist, privileges } = data;
  const classes = useStyles();
  const request = useCallback(() => {
    const idstring = playlist.trackIds.map(t => t.id).join(',');
    return getSongs(idstring);
  }, [data.trackIds]);
  const togglePlay = useCallback(() => playerModel.togglePlay(), [playerModel]);
  const source = useGetData(request);

  if (!source) return <Loading />;

  console.log('source:', source);

  const songList = playlist.tracks.map((t, i) => ({
    id: t.id,
    name: t.name,
    logo: t.al.picUrl,
    time: t.dt,
    singer: t.ar[0].name,
    url: source.data.find(o => o.id === t.id).url
  }));
  const setAudioData = () => {
    if (songList.length > 0) {
      // 添加缓存
      localStorage.setItem('songList', JSON.stringify(songList));
      playerModel.apply(songList);
    }
  };

  return (
    <Card className={classes.header}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid xs={12} md={3} item>
            <div className={classes.logo}>
              <img src={playlist.coverImgUrl} alt="" />
            </div>
          </Grid>
          <Grid xs={12} md={9} item>
            <Box>
              <Box display="flex" alignItems="center">
                <Box mr={1}>
                  <Chip
                    variant="outlined"
                    label="歌单"
                    color="secondary"
                    size="small"
                  />
                </Box>
                <Box fontSize={20}>{playlist.name}</Box>
              </Box>
              <Typography className={classes.author}>
                {playlist.creator.nickname}
              </Typography>
              <ButtonGroup variant="contained" color="primary" size="small">
                <Button
                  onClick={togglePlay}
                  startIcon={<PlayCircleFilledWhiteOutlinedIcon />}
                >
                  <Typography variant="button">播放</Typography>
                </Button>
                <Button onClick={setAudioData}>
                  <AddOutlinedIcon />
                </Button>
              </ButtonGroup>
              <Box className={classes.tags}>
                <Typography variant="body2">标签：</Typography>
                {playlist.tags.map((tag, i) => (
                  <Chip
                    className={classes.tag}
                    key={i}
                    label={tag}
                    size="small"
                  />
                ))}
              </Box>
              <Typography variant="body2" className={classes.desc}>
                {playlist.description}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
});

export default Header;
