import React from 'react';
import classes from './Footer.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faFacebook,
  faInstagram,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

// import { faEnvelope } from '@fortawesome/free';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

const Footer = ({ className, children }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      {children}
      <div className={classes.footer}>
        <h4 className={classes.title}>CHEAT\SHEET</h4>

        <h5 className={classes.name}>Designed and developed by Neil Barry</h5>
        <div className={classes.icons}>
          <a
            href="https://www.linkedin.com/in/neilmbarry/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a
            href="https://github.com/neilmbarry"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://www.neilbarry.com/" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGlobe} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
