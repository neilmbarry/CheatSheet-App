import React, { useRef } from 'react';
import classes from './LabelInput.module.css';
import store from '../../../store/store';

const LabelInput = ({
  className,
  label,
  name,
  placeholder,
  defaultValue,
  updateValue,
}) => {
  const classesList = `${classes.main} ${className}`;
  const loading = store.getState().config.value.loading;
  const value = useRef();
  return (
    <div className={classesList}>
      <label name={label}>{name}</label>
      <input
        type="text"
        placeholder={placeholder}
        ref={value}
        defaultValue={defaultValue}
        className={loading ? classes.unavailable : undefined}
        onBlur={() => updateValue(value.current.value)}
      />
    </div>
  );
};

export default LabelInput;
