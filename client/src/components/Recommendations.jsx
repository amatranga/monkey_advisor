import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import Recommendation from './Recommendation';

const Recommendations = (props) => {
  const { recommendations } = props;

  return (
    <Grid container spacing={3} item xs={12}>
      {recommendations.map((recommended) => (
        <Recommendation
          symbol={recommended.symbol}
          name={recommended.name}
          price={recommended.price}
          key={recommended.key}
        />
      ))}
    </Grid>
  );
};

Recommendations.propTypes = {
  recommendations: PropTypes.arrayOf(Object),
};

Recommendations.defaultProps = {
  recommendations: [],
};

export default Recommendations;
