import React from 'react';
import FormInput from '../../../components/UI/FormInput';
import classes from './MethodInput.module.css';
// import Button from '../../UI/Button';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import DeleteButton from '../../../components/UI/DeleteButton';

const MethodInput = ({
  text,
  index,
  removeMethod,
  id,
  updateMethod,
  loading,
}) => {
  const methodChangeHandler = (e) => {
    const value = e.target.value;
    console.log(value);
    return updateMethod({ value, id });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={classes.method}
    >
      <div className={classes.step}>
        <p>{index + 1}</p>
      </div>
      <FormInput
        placeholder="Enter Step"
        value={text}
        changeHandler={methodChangeHandler}
        loading={loading}
      />
      <DeleteButton onClick={removeMethod} />
      {/* <div className={classes.close} onClick={}>
        <FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon>
      </div> */}
    </motion.div>
  );
};

export default MethodInput;
