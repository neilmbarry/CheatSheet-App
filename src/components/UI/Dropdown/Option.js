import React from 'react';
import classes from './Option.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faWhiskeyGlass,
  faWineGlass,
  faMartiniGlass,
} from '@fortawesome/free-solid-svg-icons';
import { faLemon } from '@fortawesome/free-regular-svg-icons';
import { faPepperHot } from '@fortawesome/free-solid-svg-icons';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';
import { faCookieBite } from '@fortawesome/free-solid-svg-icons';
import { faSpider } from '@fortawesome/free-solid-svg-icons';

const map = {
  faWhiskeyGlass: faWhiskeyGlass,
  faWineGlass: faWineGlass,
  faMartiniGlass: faMartiniGlass,
  faLemon: faLemon,
  faPepperHot: faPepperHot,
  faDroplet: faDroplet,
  faCookieBite: faCookieBite,
  faSpider: faSpider,
};

const Option = ({ className, onClick, icon, name }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList} onClick={onClick}>
      {icon && <FontAwesomeIcon className={classes.icon} icon={icon} />}
      {name}
    </div>
  );
};

export default Option;
