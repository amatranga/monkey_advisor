import React from 'react';
import PropTypes from 'prop-types';

const Recommendations = (props) => {
  const { recommendations } = props;

  return (
    <div>
      Recommendations Go Here!
      {recommendations}
    </div>
  );
};

Recommendations.propTypes = {
  recommendations: PropTypes.arrayOf(Object),
};

Recommendations.defaultProps = {
  recommendations: [],
};

export default Recommendations;
