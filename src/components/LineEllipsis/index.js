import React from 'react';

import cssStyles from './index.module.scss';

export default function LineEllipsis({ text }) {
  return <div className={cssStyles.ellipsis}>{text}</div>;
}
