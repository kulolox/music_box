import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import Chip from '@material-ui/core/Chip';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';
import PauseCircleOutlineOutlinedIcon from '@material-ui/icons/PauseCircleOutlineOutlined';
import { inject, observer } from 'mobx-react';

import { strToHtml } from '@utils/tools';
import { getSongs } from '@src/utils/api/get';

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

const Header = inject('playerModel')(
  observer(({ data, playerModel }) => {
    const classes = useStyles();
    const {
      status: { playing }
    } = playerModel;
    const [songs, setSong] = useState([]);
    useEffect(() => {
      const fetchSong = async () => {
        const ids = data.trackIds.map(t => t.id).join(',');
        const result = await getSongs(ids);
        const source = result.data.data;

        // 构造播放器数据结构数据结构
        const audioData = data.tracks.map(t => {
          return {
            name: t.name,
            url: source.find(o => o.id === t.id).url
          };
        });
        setSong(audioData);
      };
      fetchSong();
    }, []);
    const setAudioData = () => {
      if (songs.length > 0) {
        playerModel.applyData(songs);
      }
    };
    const togglePlay = () => {
      playerModel.togglePlay();
    };
    if (songs.length === 0) return null;
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
              startIcon={
                !playing ? (
                  <PlayCircleFilledWhiteOutlinedIcon />
                ) : (
                  <PauseCircleOutlineOutlinedIcon />
                )
              }
            >
              <Typography>{!playing ? '播放' : '暂停'}</Typography>
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
  })
);

export default Header;
