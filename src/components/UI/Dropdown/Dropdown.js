import React, { useState } from 'react';
import classes from './Dropdown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import Option from './Option';

const Dropdown = ({
  className,
  options,
  placeholder = '- Select -',
  selected,
  updateValue,
  id,
}) => {
  const classesList = `${classes.main} ${className}`;
  const [isOpen, setIsOpen] = useState(false);

  const selectOption = (option) => {
    // setSelectedOption(option);
    updateValue(option);
    setIsOpen(false);
  };

  const optionsJSX = Object.keys(options).map((option) => {
    return (
      <Option
        icon={options[option]}
        name={option}
        onClick={() => selectOption(option)}
        key={option}
      />
    );
  });

  return (
    <div className={classesList}>
      <div className={classes.buttonContainer}>
        <Option
          onClick={() => setIsOpen((prev) => !prev)}
          name={(!selected && placeholder) || selected}
          icon={options[selected]}
          className={!selected && classes.placeholder}
        ></Option>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`${classes.chevron} ${isOpen && classes.chevronOpen}`}
        />
      </div>
      <div className={classes.options}>{isOpen && optionsJSX}</div>
    </div>
  );
};

export default Dropdown;
