import React from 'react';
import classes from './ReviewStarContainer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const ReviewStarContainer = ({ className, onClick }) => {
  const classesList = `${classes.main} ${className}`;
  const [mouseHover, setMouseHover] = useState(0);
  const [selected, setSelected] = useState(0);

  const selectedHandler = (number) => {
    setSelected(number);
    onClick(number);
  };

  const iconCalc = (number) => {
    if (selected) {
      return selected >= number ? faStarSolid : faStar;
    }
    return mouseHover >= number ? faStarSolid : faStar;
  };

  return (
    <div className={classesList} onMouseLeave={() => setMouseHover(0)}>
      <FontAwesomeIcon
        icon={
          selected >= 1
            ? selected >= 1
              ? faStarSolid
              : faStar
            : mouseHover >= 1
            ? faStarSolid
            : faStar
        }
        onMouseEnter={() => setMouseHover(1)}
        onClick={() => selectedHandler(1)}
      />
      <FontAwesomeIcon
        icon={
          selected >= 2
            ? selected >= 2
              ? faStarSolid
              : faStar
            : mouseHover >= 2
            ? faStarSolid
            : faStar
        }
        onMouseEnter={() => setMouseHover(2)}
        onClick={() => selectedHandler(2)}
      />
      <FontAwesomeIcon
        icon={
          selected >= 3
            ? selected >= 3
              ? faStarSolid
              : faStar
            : mouseHover >= 3
            ? faStarSolid
            : faStar
        }
        onMouseEnter={() => setMouseHover(3)}
        onClick={() => selectedHandler(3)}
      />
      <FontAwesomeIcon
        icon={
          selected >= 4
            ? selected >= 4
              ? faStarSolid
              : faStar
            : mouseHover >= 4
            ? faStarSolid
            : faStar
        }
        onMouseEnter={() => setMouseHover(4)}
        onClick={() => selectedHandler(4)}
      />
      <FontAwesomeIcon
        icon={
          selected >= 5
            ? selected >= 5
              ? faStarSolid
              : faStar
            : mouseHover >= 5
            ? faStarSolid
            : faStar
        }
        onMouseEnter={() => setMouseHover(5)}
        onClick={() => selectedHandler(5)}
      />
    </div>
  );
};

export default ReviewStarContainer;
