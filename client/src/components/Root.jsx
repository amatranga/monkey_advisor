import React, { useState, useEffect } from 'react';
import Recommendations from './Recommendations';
import CountInput from './CountInput';
import ErrorMessage from './ErrorMessage';

const getRandomElements = (arr, n) => {
  const newArr = [];
  let copy = arr;

  for (let i = 0; i < n; i += 1) {
    const idx = Math.floor(Math.random() * copy.length);
    newArr.push(copy[idx]);
    copy = copy.splice(copy.indexOf(idx), 1);
  }
  return newArr;
};

const Root = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [recommendationCount, setRecommendationCount] = useState(10);
  const [error, setError] = useState('');

  const stockAPI = '/stocks';

  const getRecommendations = (value) => {
    fetch(stockAPI, {
      method: 'GET',
    }).then((res) => {
      res.json().then((data) => {
        const { symbolsList } = data;
        console.log(symbolsList, ' | symbolsList');
        setRecommendations(getRandomElements(symbolsList, value));
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
  }, [recommendationCount]);

  return (
    <>
      { error.length > 0 && <ErrorMessage error={error} /> }
      <CountInput count={recommendationCount} onChange={handleChange} />
      { recommendations.length > 0 && <Recommendations recommendations={recommendations} /> }
    </>
  );
};

export default Root;
