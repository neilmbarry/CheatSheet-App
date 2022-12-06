import { AnimatePresence } from 'framer-motion';
import React from 'react';
import ReactDOM from 'react-dom';
import classes from './Notification.module.css';

const Notification = ({ className, icon, type, message }) => {
  const classesList = `${classes.main} ${className}`;
  return ReactDOM.createPortal(
    <AnimatePresence>
      {false && (
        <div className={classesList}>
          <h1>Here</h1>
        </div>
      )}
    </AnimatePresence>,
    document.getElementById('portal')
  );
};

export default Notification;
