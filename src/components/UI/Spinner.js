import classes from './Spinner.module.css';

const LoadingSpinner = ({ type }) => {
  return (
    <div className={classes.spinnerContainer}>
      <div className={`${classes.spinner} ${classes[type]}`}></div>
    </div>
  );
};

export default LoadingSpinner;
