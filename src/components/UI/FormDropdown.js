import React from 'react';
import classes from './FormDropdown.module.css';

const FormDropdown = (props) => {
  const selected = props.selected;
  const newOptions = [...props.options];
  const options = newOptions.map((option) => {
    const selected = props.selected === option;
    if (selected) {
      return (
        <option key={option} defaultValue={option}>
          {option}
        </option>
      );
    }
    return (
      <option key={option} value={option}>
        {option}
      </option>
    );
  });
  return <select className={classes.input}>{options}</select>;
};

export default FormDropdown;
