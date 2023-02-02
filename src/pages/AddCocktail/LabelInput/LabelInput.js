import React, { useRef } from 'react';
import classes from './LabelInput.module.css';
import store from '../../../store/store';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../../../components/UI/Spinner';

const LabelInput = ({
  className,
  label,
  name,
  placeholder,
  defaultValue,
  updateValue,
  valid,
  loading,
  invalid,
}) => {
  const classesList = `${classes.main} ${className}`;

  const value = useRef(defaultValue);

  useEffect(() => {
    value.current.value = defaultValue || '';
  }, [defaultValue]);
  return (
    <div className={classesList}>
      <label name={label} className={classes.label}>
        {name}
      </label>
      <div className={`${classes.inputContainer}`}>
        <input
          type="text"
          placeholder={placeholder}
          ref={value}
          // defaultValue={defaultValue}
          className={`${classes.input} ${invalid && classes.invalid}`}
          onBlur={() => updateValue(value.current.value)}
        />

        <div className={classes.iconContainer}>
          {valid === 'invalid' && (
            <FontAwesomeIcon
              icon={faCircleExclamation}
              className={classes.error}
            />
          )}
          {valid === 'valid' && (
            <FontAwesomeIcon icon={faCircleCheck} className={classes.icon} />
          )}
          {loading && <LoadingSpinner />}
        </div>
      </div>
    </div>
  );
};

export default LabelInput;
