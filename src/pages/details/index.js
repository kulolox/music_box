import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({}));

export default function Details() {
  const classes = useStyles();

  return <div className={classes.details}>详情</div>;
}
