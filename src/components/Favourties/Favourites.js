import React from 'react';
import classes from './Favourites.module.css';
import Result from '../SearchResults/Result';
import img from '../../img/paper.jpg';
import img1 from '../../img/cock.jpg';
import img2 from '../../img/cock2.jpg';
import img3 from '../../img/cock3.jpg';
import img4 from '../../img/cock4.jpg';
import { motion } from 'framer-motion';
import store from '../../store/store';

const Favourites = ({ className, children, results, onClose }) => {
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

  const faveSlugs = store.getState().cocktails.value.faves;

  const resultsJSX = store
    .getState()
    .cocktails.value.cocktails.filter((cocktail) =>
      results.includes(cocktail.slug)
    )
    .map((cocktail, i) => {
      return (
        <Result
          name={cocktail.name}
          tags={[
            cocktail.ingredients[0].type,
            cocktail.flavour,
            cocktail.glass,
          ]}
          rating={4.9}
          reviews={23}
          key={i}
          image={cocktail.image}
          slug={cocktail.slug}
          isAuthor={true}
          fave={faveSlugs.includes(cocktail.slug)}
        />
      );
    });

  const variants = {
    hidden: {
      x: 400,
    },
    visible: {
      x: 0,
      transition: {
        type: 'spring',

        duration: 0.3,
      },
    },
    exit: {
      x: 700,
    },
  };
  const backVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.1,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      variants={backVariants}
      animate="visible"
      initial="hidden"
      exit="exit"
      className={classes.backdrop}
      onClick={onClose}
    >
      <motion.div
        variants={variants}
        animate="visible"
        initial="hidden"
        exit="exit"
        className={classesList}
      >
        <div className={classes.options}>
          <h6>My favourites</h6>
          {/* <div className={classes.dropdown}>
            <h6>Sort by:</h6>
            <select name="" id="">
              <option value="">rating</option>
              <option value="">newest</option>
              <option value="">relevant</option>
            </select>
          </div> */}
        </div>
        <div className={classes.results}>
          {children}
          {false && template}
          {true && resultsJSX}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Favourites;
