import { AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import classes from './Notification.module.css';
import {
  faCircleCheck,
  faCircleXmark,
} from '@fortawesome/free-regular-svg-icons';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { notificationVariants } from '../../../config/animationVariants';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import store from '../../../store/store';
import configActions from '../../../store/configSlice';

const iconMap = {
  success: faCircleCheck,
  fail: faCircleXmark,
  info: faCircleInfo,
};

const Notification = ({ className, icon, type, message }) => {
  const notification = useSelector((state) => state.config.value.notification);
  const classesList = `${classes.main} ${className} ${
    classes[notification?.type]
  }`;

  useEffect(() => {
    const theTimeout = setTimeout(() => {
      store.dispatch(configActions.setNotification(null));
    }, 2000);
    return () => {
      clearTimeout(theTimeout);
    };
  }, [notification]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {notification && (
        <motion.div
          variants={notificationVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={classesList}
        >
          <FontAwesomeIcon
            icon={iconMap[notification.type]}
            className={classes.icon}
          />
          <h3 className={classes.title}>{notification.message}</h3>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById('portal')
  );
};

export default Notification;
