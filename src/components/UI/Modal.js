import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

// import { motion } from "framer-motion";

const Modal = ({ className, onClose, children }) => {
  const classesList = `${classes.main} ${className}`;

  //   const socket = useSocket();

  return ReactDOM.createPortal(
    <div>
      <div className={classes.overlay} onClick={onClose}></div>
      <div className={classesList}>{children}</div>
    </div>,
    document.getElementById('portal')
  );
};

export default Modal;
