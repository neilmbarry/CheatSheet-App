import React from 'react';
import classes from './SearchResults.module.css';
import Result from './Result';
import img from '../../img/paper.jpg';
import img1 from '../../img/cock.jpg';
import img2 from '../../img/cock2.jpg';
import img3 from '../../img/cock3.jpg';
import img4 from '../../img/cock4.jpg';
import { motion } from 'framer-motion';

const SearchResults = ({ className, children, results, onClick }) => {
  // const [isActive, setIsActive] = useState(false);
  const classesList = `${classes.main} ${className}`;
  const template = (
    <>
      <Result
        img={img}
        name="Paper Plane"
        tags={['Citrusy', 'Bourbon', 'Coupe']}
        rating={4.9}
        reviews={104}
        isAuthor={true}
        fave={true}
      />
      <Result
        img={img1}
        name="Dark & Stormy"
        tags={['Citrusy', 'Rum', 'Rocks']}
        rating={4.7}
        reviews={98}
        isAuthor={false}
      />
      <Result
        img={img4}
        name="Pink Lady"
        tags={['Citrusy', 'Gin', 'Flute']}
        rating={4.8}
        reviews={117}
        isAuthor={false}
        fave={true}
      />
      <Result
        img={img2}
        name="Blackberry Shrub"
        tags={['Citrusy', 'Vodka', 'Coupe']}
        rating={5.0}
        reviews={109}
        isAuthor={true}
      />
      <Result
        img={img3}
        name="Last Word"
        tags={['Citrusy', 'Mezcal', 'Neat']}
        rating={4.9}
        reviews={166}
        isAuthor={false}
      />
    </>
  );
  const defaultVariants = {
    hidden: {
      x: -450,
    },
    visible: {
      x: 0,
      transition: {
        type: 'spring',

        duration: 0.3,
      },
    },
    exit: {
      x: -450,

      transition: {
        duration: 0.2,
      },
    },
  };

  const backdropVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,

      transition: {
        duration: 0.2,
      },
    },
  };

  const variants = defaultVariants;

  return (
    <motion.div
      className={classes.backdrop}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit={backdropVariants.exit}
      onClick={onClick}
    >
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        exit={variants.exit}
        className={classesList}
      >
        <div className={classes.options}>
          <h6>71 matching results for 'paper plane'</h6>
          <div className={classes.dropdown}>
            <h6>Sort by:</h6>
            <select name="" id="">
              <option value="">rating</option>
              <option value="">newest</option>
              <option value="">relevant</option>
            </select>
          </div>
        </div>
        <div className={classes.results}>
          {children}
          {false && template}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchResults;
