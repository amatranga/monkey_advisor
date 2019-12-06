import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import Recommendations from './Recommendations';
import CountInput from './CountInput';
import ErrorMessage from './ErrorMessage';

const Root = () => {
  const [allRecommendations, setAllRecommendations] = useState([]);
  const [recommendations, setrecommendations] = useState([]);
  const [recommendationCount, setRecommendationCount] = useState(10);
  const [error, setError] = useState('');
  const [searchTimer, setsearchTimer] = useState(undefined);

  const stockAPI = '/stocks';
  const searchDelayMS = 500;

  // Functions
  const debounce = (condition, callback, ...args) => {
    let timer = searchTimer;

    if (condition) {
      if (timer) { clearTimeout(timer); }

      timer = window.setTimeout(() => {
        callback(...args);
      }, searchDelayMS);
      setsearchTimer(timer);
    } else {
      clearTimeout(timer);
      setsearchTimer(undefined);
    }
  };

  const getRand = (arr, n) => (
    arr
      .map((x) => ({ x, r: Math.random() }))
      .sort((a, b) => a.r - b.r)
      .map((a) => a.x)
      .slice(0, n)
  );

  const handleChange = (e) => {
    const { value } = e.target;
    const int = parseInt(value, 10);

    debounce(recommendationCount, setRecommendationCount, int);
    // setRecommendationCount(int);
  };

  const getRecommendations = () => {
    fetch(stockAPI, { method: 'GET' }).then((data) => {
      data.json().then((res) => {
        const { symbolsList } = res;
        setAllRecommendations(symbolsList);
      });
    }).catch((err) => {
      setError(err);
    });
  };

  // Effects
  useEffect(() => {
    getRecommendations();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (allRecommendations) {
      if (recommendationCount < 1 || recommendationCount > 20) {
        setError('Please select a number between 1 and 20');
      } else {
        setError('');
        setrecommendations(getRand(allRecommendations, recommendationCount));
      }
    }
  }, [allRecommendations, recommendationCount]);

  return (
    <Grid container spacing={3}>
      { error.length > 0 && <ErrorMessage error={error} /> }
      <CountInput count={recommendationCount} onChange={handleChange} />
      { recommendations.length > 0 && <Recommendations recommendations={recommendations} /> }
    </Grid>
  );
};

export default Root;
