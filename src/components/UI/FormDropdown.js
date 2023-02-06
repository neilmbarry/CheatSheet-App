import React from 'react';
import classes from './FormDropdown.module.css';

const FormDropdown = ({ options, selected, changeHandler, id, loading }) => {
  const optionsList = options.map((option) => {
    return (
      <option key={option} value={option} className={classes.option}>
        {option}
      </option>
    );
  });
  return (
    <select
      className={`${classes.input} ${loading ? classes.un : undefined}`}
      defaultValue={selected}
      onChange={changeHandler}
      id={id}
    >
      {optionsList}
    </select>
  );
};

export default FormDropdown;
