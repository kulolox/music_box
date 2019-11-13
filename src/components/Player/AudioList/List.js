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
  const {
    audioData,
    status: { index }
  } = playerModel;
  return (
    <Box width="50%" height="100%" color="#fff">
      <Box className={classes.head}>歌曲列表</Box>
      <Box height="calc(100% - 36px)" position="relative">
        <ScrollBarContainer>
          <List component="nav">
            {audioData.map((data, i) => (
              <ListItem
                key={data.id}
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
  );
});

export default Mlist;
