import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Recommendations from './Recommendations';
import CountInput from './CountInput';
import ErrorMessage from './ErrorMessage';

const Root = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationCount, setRecommendationCount] = useState(10);
  const [error, setError] = useState('');

  const stockAPI = '/stocks';

  const getRand = (arr, n) => {
    const res = new Array(n);
    const len = arr.length;
    const taken = new Array(n);
    let o = n;

    if (o > len) { throw new RangeError('getRand: more elements taken than available'); }
    // eslint-disable-next-line no-plusplus
    while (o--) {
      const x = Math.floor(Math.random() * len);
      res[o] = arr[x in taken ? taken[x] : x];
      res[o].key = o;
      taken[x] = (len - 1) in taken ? taken[len] : len;
    }

    return res;
  };

  const getRecommendations = (value) => {
    fetch(stockAPI, {
      method: 'GET',
    }).then((res) => {
      res.json().then((data) => {
        const { symbolsList } = data;
        try {
          setRecommendations(getRand(symbolsList, value));
        } catch (e) {
          setError(e);
        }
      });
    }).catch((err) => {
      setError(err);
    });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setError('');
    if (value < 1) {
      setError('Please select between 1 and 20 random stocks to view');
    } else if (value > 20) {
      setError('Please select no more than 20 random stocks to view');
    } else {
      setRecommendationCount(value);
      getRecommendations(value);
    }
  };

  useEffect(() => {
    getRecommendations(recommendationCount);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recommendationCount]);

  return (
    <Grid container spacing={3}>
      { error.length > 0 && <ErrorMessage error={error} /> }
      <CountInput count={recommendationCount} onChange={handleChange} />
      { recommendations.length > 0 && <Recommendations recommendations={recommendations} /> }
    </Grid>
  );
};

export default Root;
