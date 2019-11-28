import React from 'react';
import { observer } from 'mobx-react';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowRightRoundedIcon from '@material-ui/icons/ArrowRightRounded';

import ScrollBarContainer from '@components/ScrollBarContainer';
import { GlobalContext } from '@src/App';
import Duration from '@components/Duration';

const useStyles = makeStyles(theme => ({
  head: {
    background: 'rgba(0,0,0,0.8)',
    padding: '8px 16px',
    textAlign: 'center'
  }
}));

const Mlist = observer(() => {
  const { playerModel } = React.useContext(GlobalContext);
  const classes = useStyles();
  const { lists, index } = playerModel;
  return (
    <Box width="50%" height="100%" color="#fff">
      <Box className={classes.head}>歌曲列表</Box>
      <Box height="calc(100% - 36px)" position="relative">
        <ScrollBarContainer>
          <List component="nav">
            {lists.map((data, i) => (
              <ListItem
                justifyContent="space-between"
                key={data.id}
                onClick={() => playerModel.playByIndex(i)}
                button
              >
                <Box display="flex" width={30}>
                  {index === i && (
                    <ArrowRightRoundedIcon style={{ color: 'red' }} />
                  )}
                </Box>
                <ListItemText
                  primary={<Box fontSize="13px">{data.name}</Box>}
                />
                <Box fontSize="12px" padding="0 16px">
                  <span>{data.singer}</span>
                </Box>
                <Box fontSize="12px" padding="0 8px">
                  <Duration seconds={data.time / 1000} />
                </Box>
              </ListItem>
            ))}
          </List>
        </ScrollBarContainer>
      </Box>
    </Box>
  );
});

export default Mlist;
