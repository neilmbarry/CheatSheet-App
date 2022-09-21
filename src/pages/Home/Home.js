import React from 'react';
import classes from './Home.module.css';
import HomeSection from './HomeSection';
import HomeSubsection from './HomeSubsection';
import photo from '../../assets/img/iphone-app-940.png';
import barPhoto from '../../assets/img/bar.jpg';

const Home = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <div className={classesList}>
      <HomeSection photo={photo} background={barPhoto} />
      <HomeSubsection />
      {/* <HomeSection type="secondary" />
      <HomeSection photo={photo} /> */}
    </div>
  );
};

export default Home;
