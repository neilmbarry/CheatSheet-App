import React from 'react';
import classes from './AuthorIcon.module.css';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

const AuthorIcon = ({ className, authorId, slug }) => {
  const classesList = `${classes.main} ${className}`;
  const navigate = useNavigate();

  const userId = useSelector((state) => state.config.value.id);

  console.log(authorId, userId, 'EQUATE');
  const isAuthor = authorId === userId;

  const navToEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/modify-cocktail/' + slug);
  };

  if (!isAuthor) return <></>;

  return (
    <div className={classes.icon + ' ' + classes.fav} onClick={navToEdit}>
      <FontAwesomeIcon icon={faPenToSquare} />
    </div>
  );
};

export default AuthorIcon;
