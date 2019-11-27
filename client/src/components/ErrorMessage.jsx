import React from 'react';
import propTypes from 'prop-types';

const ErrorMessage = (props) => {
  const { error } = props;

  return (
    <div>
      <p>{error}</p>
    </div>
  );
};

ErrorMessage.propTypes = {
  error: propTypes.string.isRequired,
};

export default ErrorMessage;
