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
    marginRight: 24
  },
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
    marginTop: 8
  }
}));

const Header = observer(({ data }) => {
  const { playerModel } = React.useContext(GlobalContext);
  const classes = useStyles();
  const ids = data.trackIds.map(t => t.id).join(',');
  const request = useCallback(() => getSongs(ids), [ids]);
  const source = useGetData(request);
  if (!source) return null;
  console.log('source:', source);
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
      playerModel.apply(songList);
    }
  };
  const togglePlay = () => {
    playerModel.togglePlay();
  };
  return (
    <Card className={classes.header}>
      <div className={classes.logo}>
        <img src={data.coverImgUrl} alt="" />
      </div>
      <Box flex="1">
        <Box mb={2} display="flex" alignItems="center">
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
            <Chip className={classes.tag} key={i} label={tag} size="small" />
          ))}
        </Box>
        <Typography className={classes.desc}>{data.description}</Typography>
      </Box>
    </Card>
  );
});

export default Header;
