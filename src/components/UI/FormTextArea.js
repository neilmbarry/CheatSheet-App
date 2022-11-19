import React from 'react';
import classes from './FormTextArea.module.css';

const FormTextArea = ({ className, placeholder = 'Enter Text' }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <textarea className={classesList} placeholder={placeholder}></textarea>
  );
};

export default FormTextArea;
