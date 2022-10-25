import React from 'react';
// import classNamees from './NewDropdown.module.css';
import './NewDropdown.css';

const NewDropdown = ({ className }) => {
  //   const classesList = `${classes.main} ${className}`;
  return (
    <>
      <div className="list-choice">
        <div className="list-choice-title">Month</div>
        <div className="list-choice-objects">
          <label>
            <input type="radio" name="month" /> <span>January</span>
          </label>
          <label>
            <input type="radio" name="month" /> <span>February</span>
          </label>
          <label>
            <input type="radio" name="month" /> <span>March</span>
          </label>
          <label>
            <input type="radio" name="month" /> <span>April</span>
          </label>
          <label>
            <input type="radio" name="month" /> <span>May</span>
          </label>
          <label>
            <input type="radio" name="month" /> <span>June</span>
          </label>
          <label>
            <input type="radio" name="month" /> <span>July</span>
          </label>
          <label>
            <input type="radio" name="month" /> <span>September</span>
          </label>
          <label>
            <input type="radio" name="month" /> <span>October</span>
          </label>
          <label>
            <input type="radio" name="month" /> <span>November</span>
          </label>
          <label>
            <input type="radio" name="month" /> <span>December</span>
          </label>
        </div>
      </div>
    </>
  );
};

export default NewDropdown;
