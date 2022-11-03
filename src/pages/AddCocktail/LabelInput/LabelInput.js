import React, { useRef } from 'react';
import classes from './LabelInput.module.css';
import store from '../../../store/store';
import { useEffect } from 'react';

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
  const value = useRef(defaultValue);

  useEffect(() => {
    value.current.value = defaultValue || '';
  }, [defaultValue]);
  return (
    <div className={classesList}>
      <label name={label} className={classes.label}>
        {name}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        ref={value}
        // defaultValue={defaultValue}
        className={loading ? classes.unavailable : classes.input}
        onBlur={() => updateValue(value.current.value)}
      />
    </div>
  );
};

export default LabelInput;
