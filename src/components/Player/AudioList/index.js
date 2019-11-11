import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';
import Badge from '@material-ui/core/Badge';

import ScrollBarContainer from '@components/ScrollBarContainer';

const useStyles = makeStyles(theme => ({
  listContainer: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    bottom: 48,
    height: 400,
    borderRadius: '4px 4px 0 0',
    boxShadow: '0 -2px 4px 0 rgba(0,0,0,.2)',
    overflow: 'hidden',
    display: 'flex',
    background: 'rgba(0,0,0,0.75)'
  },
  head: {
    background: 'rgba(0,0,0,0.8)',
    padding: '8px 16px',
    textAlign: 'center'
  }
}));

const AudioList = inject('playerModel')(
  observer(({ playerModel }) => {
    const classes = useStyles();
    const [showList, toggleList] = useState(false);
    const {
      audioData,
      status: { index }
    } = playerModel;

    return (
      <React.Fragment>
        <Fade in={showList}>
          <Box width={980} className={classes.listContainer}>
            <Box width="50%" height="100%" color="#fff">
              <Box className={classes.head}>歌曲列表</Box>
              <Box height="100%" position="relative">
                <ScrollBarContainer>
                  <List component="nav">
                    {audioData.map((data, i) => (
                      <ListItem
                        key={data.url}
                        onClick={() => playerModel.playByIndex(i)}
                        button
                      >
                        <Box display="flex" width={30}>
                          {index === i && (
                            <ArrowRightRoundedIcon style={{ color: 'red' }} />
                          )}
                        </Box>
                        <ListItemText fontSize="14px" primary={data.name} />
                      </ListItem>
                    ))}
                  </List>
                </ScrollBarContainer>
              </Box>
            </Box>
            <Box width="50%" height="100%" color="#fff">
              <Box className={classes.head}>歌词</Box>
              <Box height="100%" position="relative">
                <ScrollBarContainer></ScrollBarContainer>
              </Box>
            </Box>
          </Box>
        </Fade>

        <IconButton
          onClick={() => toggleList(prevState => !prevState)}
          aria-label="list"
        >
          <Badge badgeContent={audioData.length} color="secondary">
            <PlaylistPlayIcon />
          </Badge>
        </IconButton>
      </React.Fragment>
    );
  })
);

export default AudioList;
