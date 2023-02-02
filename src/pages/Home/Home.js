import React from 'react';
import classes from './Home.module.css';
import LandingSection from './LandingSection';
import HomeSubsection from './HomeSubsection';

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
      <LandingSection />
      <HomeSubsection />
    </motion.div>
  );
};

export default Home;
