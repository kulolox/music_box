import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import Chip from '@material-ui/core/Chip';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import { observer } from 'mobx-react';

import { strToHtml } from '@utils/tools';
import { getSongs } from '@src/utils/api/get';
import useGetData from '@src/hooks/useGetData';
import PlayerContext from '@src/context/PlayerContext';

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
    marginTop: 16
  }
}));

const Header = observer(({ data }) => {
  const playerModel = React.useContext(PlayerContext);
  console.log('playerModel:', playerModel);
  const classes = useStyles();
  const ids = data.trackIds.map(t => t.id).join(',');
  const source = useGetData(getSongs, ids);
  if (!source) return null;
  const songs = data.tracks.map(t => {
    return {
      id: t.id,
      name: t.name,
      url: source.data.find(o => o.id === t.id).url
    };
  });
  const setAudioData = () => {
    if (songs.length > 0) {
      playerModel.applyData(songs);
    }
  };
  const togglePlay = () => {
    playerModel.togglePlay();
  };
  return (
    <div className={classes.header}>
      <div className={classes.logo}>
        <img src={data.coverImgUrl} alt="" />
      </div>
      <div>
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
        <Typography
          className={classes.desc}
          dangerouslySetInnerHTML={{
            __html: strToHtml(data.description)
          }}
        />
      </div>
    </div>
  );
});

export default Header;
