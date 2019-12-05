import React from 'react';
import { Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing(1),
  },
}));

const CountInput = (props) => {
  const classes = useStyles();
  const { count } = props;
  const { onChange } = props;

  const handleChange = (e) => (
    onChange(e)
  );

  return (
    <Grid item xs={12}>
      <form className={classes.container} autoComplete="off">
        <div>
          <TextField
            type="number"
            id="count"
            name="count"
            min="0"
            max="20"
            defaultValue={count}
            onChange={handleChange}
          />
        </div>
      </form>
    </Grid>
  );
};

CountInput.propTypes = {
  count: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired,
};

export default CountInput;
