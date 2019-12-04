import React, { useState } from 'react';
import propTypes from 'prop-types';
import {
  Grid,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  card: {
    minWidth: 275,
    '&:hover': {
      backgroundColor: '#fafafa',
    },
  },
}));

const Recommendation = (props) => {
  const [raised, setRaised] = useState(false);
  const classes = useStyles();

  const toggleRaised = () => {
    setRaised(!raised);
  };

  const { symbol, name, price } = props;

  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      onMouseOver={toggleRaised}
      onBlur={toggleRaised}
      onMouseOut={toggleRaised}
      onFocus={toggleRaised}
    >
      <Card className={classes.card} raised={raised}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
          >
            {symbol}
          </Typography>
          <Typography
            variant="body2"
            component="p"
          >
            {name}
          </Typography>
          <Typography
            variant="body2"
            component="p"
          >
            {price}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

Recommendation.propTypes = {
  symbol: propTypes.string.isRequired,
  name: propTypes.string.isRequired,
  price: propTypes.number.isRequired,
};

export default Recommendation;
