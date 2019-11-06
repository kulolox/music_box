import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const getDate = seconds => {
  return new Date(seconds * 1000);
};

const Duration = ({ className, seconds }) => {
  return (
    <span className={className}>
      {moment(getDate(seconds))
        .utcOffset(0)
        .format('HH:mm:ss')}
    </span>
  );
};

Duration.propTypes = {
  className: PropTypes.string,
  seconds: PropTypes.number.isRequired
};

Duration.defaultProps = {
  className: ''
};

export default Duration;
