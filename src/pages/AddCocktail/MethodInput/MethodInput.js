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
  invalid,
}) => {
  const methodChangeHandler = (e) => {
    const value = e.target.value;

    return updateMethod({ value, id });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={classes.method}
    >
      <div className={classes.step}>
        <p className={classes.index}>{index + 1}</p>
      </div>
      <FormInput
        placeholder="Enter Step"
        value={text}
        changeHandler={methodChangeHandler}
        loading={loading}
        invalid={invalid}
      />
      <DeleteButton onClick={removeMethod} />
    </motion.div>
  );
};

export default MethodInput;
