import React from 'react';
import { observer } from 'mobx-react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import PlayCircleFilledWhiteOutlinedIcon from '@material-ui/icons/PlayCircleFilledWhiteOutlined';

import Duration from '@src/components/Duration';
import LineEllipsis from '@src/components/LineEllipsis';
// import { GlobalContext } from '@src/App';

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 16
  }
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#dcdcdc'
    }
  }
}))(TableRow);

function SongList({ data }) {
  const classes = useStyles();
  // privileges
  const { playlist } = data;
  // const { playerModel } = React.useContext(GlobalContext);
  // const {
  //   lists,
  //   index,
  //   status: { playing }
  // } = playerModel;
  // const playByIndex = useCallback(i => playerModel.playByIndex(i), [
  //   playerModel
  // ]);

  return (
    <Card className={classes.container}>
      <CardContent>
        <Box display="flex" alignItems="flex-end" paddingLeft={2}>
          <Box fontSize={20} mr={4}>
            歌曲列表
          </Box>
          <Box>{playlist.tracks.length}首歌</Box>
        </Box>
        <Table size="small" className={classes.table} aria-label="song list">
          <TableHead>
            <TableRow>
              <StyledTableCell></StyledTableCell>
              <StyledTableCell>歌曲标题</StyledTableCell>
              <StyledTableCell>时长</StyledTableCell>
              <StyledTableCell>歌手</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playlist.tracks.map((track, i) => (
              <StyledTableRow key={track.id}>
                <StyledTableCell component="th" scope="row">
                  <Box
                    display="flex"
                    width="64px"
                    justifyContent="space-between"
                  >
                    <Typography variant="body1">{i + 1}</Typography>
                    <IconButton size="small">
                      <PlayCircleFilledWhiteOutlinedIcon />
                    </IconButton>
                  </Box>
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <LineEllipsis text={track.name} />
                </StyledTableCell>
                <StyledTableCell>
                  <Duration seconds={track.dt / 1000} />
                </StyledTableCell>
                <StyledTableCell>{track.ar[0].name}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default observer(SongList);
