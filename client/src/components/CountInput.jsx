import React from 'react';
import propTypes from 'prop-types';

const CountInput = (props) => {
  const { count } = props;
  const { onChange } = props;

  return (
    <form>
      <label htmlFor="count">
        Number of Stocks to Retrieve:
        <input type="number" id="count" name="count" min="0" max="20" defaultValue={count} onChange={onChange} />
      </label>
    </form>
  );
};

CountInput.propTypes = {
  count: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired,
};

export default CountInput;
