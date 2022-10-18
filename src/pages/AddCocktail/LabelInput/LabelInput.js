import React from 'react';
import classes from './LabelInput.module.css';
import store from '../../../store/store';

const LabelInput = ({
  className,
  label,
  name,
  placeholder,
  parentRef,
  defaultValue,
}) => {
  const classesList = `${classes.main} ${className}`;
  const loading = store.getState().config.value.loading;
  return (
    <div className={classesList}>
      <label name={label}>{name}</label>
      <input
        type="text"
        placeholder={placeholder}
        ref={parentRef}
        defaultValue={defaultValue}
        className={loading ? classes.unavailable : undefined}
        onBlur={() => console.log('Focuse out')}
      />
    </div>
  );
};

export default LabelInput;
