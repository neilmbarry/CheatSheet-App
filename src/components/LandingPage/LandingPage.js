import React from 'react';
import classes from './LandingPage.module.css';
import LandingSection from './LandingSection';
import LandingSubsection from './LandingSubsection';
import photo from '../../img/iphone-app-940.png';
import barPhoto from '../../img/bar.jpg';

const LandingPage = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <LandingSection photo={photo} background={barPhoto} />
      <LandingSubsection />
      {/* <LandingSection type="secondary" />
      <LandingSection photo={photo} /> */}
    </div>
  );
};

export default LandingPage;
