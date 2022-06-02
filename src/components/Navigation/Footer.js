import React from 'react';
import classes from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faFacebook,
  faInstagram,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

// import { faEnvelope } from '@fortawesome/free';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const Footer = ({ className, children }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      {children}
      <div className={classes.footer}>
        <h3 className={classes.title}>Cheat\Sheet</h3>
        <h5 className={classes.subtitle}>
          Recipes you want to make. Cooking advice that works. Restaurant
          recommendations you trust.
        </h5>
        <h5 className={classes.name}>Designed and developed by Neil Barry</h5>
        <div className={classes.icons}>
          <FontAwesomeIcon icon={faFacebook} />
          <FontAwesomeIcon icon={faInstagram} />
          <FontAwesomeIcon icon={faGithub} />
          <FontAwesomeIcon icon={faEnvelope} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
