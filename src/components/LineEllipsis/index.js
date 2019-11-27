import React from 'react';

import cssStyles from './index.module.scss';

const LineEllipsis = ({ text }) => {
  return <div className={cssStyles.ellipsis}>{text}</div>;
};

export default LineEllipsis;
