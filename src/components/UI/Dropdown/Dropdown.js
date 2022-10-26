import React, { useState } from 'react';
import classes from './Dropdown.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import Option from './Option';

const Dropdown = ({ className, options, placeholder = '- Select -' }) => {
  const classesList = `${classes.main} ${className}`;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState();

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  console.log(options);

  const options2 = options.map((option) => {
    return (
      <Option
        icon={option.icon}
        name={option.name}
        onClick={() => selectOption(option)}
        key={option.name}
      />
    );
  });

  return (
    <div
      className={classesList}
      onBlur={() => {
        console.log('BLURRING');
        setIsOpen(false);
      }}
    >
      <div className={classes.buttonContainer}>
        <Option
          // className={classes.button}
          onClick={() => setIsOpen((prev) => !prev)}
          name={(!selectedOption?.name && placeholder) || selectedOption?.name}
          icon={selectedOption?.icon}
          className={!selectedOption?.name && classes.placeholder}
        ></Option>
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`${classes.chevron} ${isOpen && classes.chevronOpen}`}
        />
      </div>
      <div className={classes.options}>{isOpen && options2}</div>
    </div>
  );
};

export default Dropdown;
