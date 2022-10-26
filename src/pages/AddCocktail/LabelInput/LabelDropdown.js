import React from 'react';
import classes from './LabelDropdown.module.css';
import Dropdown from '../../../components/UI/Dropdown/Dropdown';

const LabelDropdown = ({
  className,
  label,
  name,
  options,
  placeholder,
  defaultValue,
  updateValue,
}) => {
  const classesList = `${classes.main} ${className}`;
  console.log(options);
  return (
    <div className={classesList}>
      <label name={label} className={classes.label}>
        {name}
      </label>
      <Dropdown options={options} />
    </div>
  );
};

export default LabelDropdown;
