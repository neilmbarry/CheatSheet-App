import React from 'react';
import classes from './FormDropdown.module.css';

const FormDropdown = ({ options, selected, changeHandler, id }) => {
  const optionsList = options.map((option) => {
    return (
      <option key={option} value={option}>
        {option}
      </option>
    );
  });
  return (
    <select
      className={classes.input}
      defaultValue={selected}
      onChange={changeHandler}
      id={id}
    >
      {optionsList}
    </select>
  );
};

export default FormDropdown;
