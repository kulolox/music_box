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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Duration from '@src/components/Duration';
import LineEllipsis from '@src/components/LineEllipsis';
import { Hidden } from '@material-ui/core';
import { checkMusic } from '@src/utils/tools';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 16,
    '& .MuiTableRow-root.Mui-selected': {
      background: '#f4f4f4'
    },
    '& .MuiTableRow-root.Mui-selected td': {
      color: '#ccc'
    }
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
    '&:nth-of-type(even)': {
      backgroundColor: '#f2f2f2'
    },
    '&:nth-of-type(odd)': {
      backgroundColor: '#dcdcdc'
    }
  }
}))(TableRow);

function SongList({ data }) {
  const classes = useStyles();
  const { playlist, privileges } = data;
  return (
    <Card className={classes.root}>
      <CardContent>
        <Box display="flex" alignItems="flex-end" pl={2}>
          <Box fontSize={20} mr={4}>
            歌曲列表
          </Box>
          <Box>{playlist.tracks.length}首歌</Box>
        </Box>
        <Table size="small" className={classes.table} aria-label="song list">
          <TableHead>
            <TableRow>
              <Hidden xsDown>
                <StyledTableCell></StyledTableCell>
              </Hidden>
              <StyledTableCell>歌曲标题</StyledTableCell>
              <StyledTableCell>时长</StyledTableCell>
              <StyledTableCell>歌手</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playlist.tracks.map((track, i) => (
              <StyledTableRow
                key={track.id}
                selected={!checkMusic(privileges[i])}
              >
                <Hidden xsDown>
                  <StyledTableCell size="small">
                    <Typography variant="body1">{i + 1}</Typography>
                  </StyledTableCell>
                </Hidden>
                <StyledTableCell size="small">
                  <LineEllipsis text={track.name} />
                </StyledTableCell>
                <StyledTableCell size="small">
                  <Duration seconds={track.dt / 1000} />
                </StyledTableCell>
                <StyledTableCell size="small">
                  {track.ar[0].name}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default observer(SongList);
