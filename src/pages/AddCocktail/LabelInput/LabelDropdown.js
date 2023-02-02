import React from 'react';
import classes from './LabelDropdown.module.css';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';

const LabelDropdown = ({
  className,
  label,
  name,
  options,
  invalid,
  defaultValue,
  updateValue,
}) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <label name={label} className={classes.label}>
        {name}
      </label>
      <Dropdown
        options={options}
        selected={defaultValue}
        updateValue={updateValue}
        invalid={invalid}
      />
    </div>
  );
};

export default LabelDropdown;
