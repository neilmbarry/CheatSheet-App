import React from 'react';
import classes from './FormDropdown.module.css';

const FormDropdown = ({ options, selected }) => {
  const optionsList = options.map((option) => {
    return (
      <option key={option} value={option}>
        {option}
      </option>
    );
  });
  return (
    <select className={classes.input} defaultValue={selected}>
      {optionsList}
    </select>
  );
};

export default FormDropdown;
