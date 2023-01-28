import React from 'react';
import classes from './Home.module.css';
import HomeSection from './HomeSection';
import HomeSubsection from './HomeSubsection';
import photo from '../../assets/img/iphone.png';
import barPhoto from '../../assets/img/bar.jpg';
import { motion } from 'framer-motion';
import { homePageVariants } from '../../config/animationVariants';

const Home = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  return (
    <motion.div
      variants={homePageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={classesList}
    >
      <HomeSection photo={photo} background={barPhoto} />
      <HomeSubsection />
      {/* <HomeSection type="secondary" />
      <HomeSection photo={photo} /> */}
    </motion.div>
  );
};

export default Home;
