import React from 'react';
import classes from './FormTextArea.module.css';

const FormTextArea = ({ className, placeholder = 'Enter Text', parentRef }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <textarea
      ref={parentRef}
      className={classesList}
      placeholder={placeholder}
    ></textarea>
  );
};

export default FormTextArea;
