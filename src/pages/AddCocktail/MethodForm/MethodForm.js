import React from 'react';
import classes from './MethodForm.module.css';
import MethodInput from '../MethodInput/MethodInput';
import store from '../../../store/store';

import { generateId } from '../../../util/generateId';
import createCocktailActions from '../../../store/createCocktailSlice';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useCallback } from 'react';

const MethodForm = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const loading = store.getState().config.value.loading;

  const method = useSelector((state) => state.create.value.method);

  const addMethod = useCallback(() => {
    const newMethod = [...method, { key: generateId() }];
    store.dispatch(createCocktailActions.changeMethod(newMethod));
  }, [method]);

  const removeMethod = (id) => {
    const updatedMethod = method.filter((step) => {
      if (step.key === id || step._id === id) return false;
      return true;
    });
    store.dispatch(createCocktailActions.changeMethod(updatedMethod));
  };

  const updateMethod = (info) => {
    const updatedMethod = method.map((step) => {
      console.log(step._id, info.id);
      if (step.key === info.id || step._id === info.id) {
        return { ...step, value: info.value };
      }
      return step;
    });
    console.log(updatedMethod);
    store.dispatch(createCocktailActions.changeMethod(updatedMethod));
  };

  const methodUI = method.map((step, i) => (
    <MethodInput
      text={step.value}
      key={step.key || step._id}
      id={step.key || step._id}
      index={i}
      updateMethod={(info) => updateMethod(info)}
      removeMethod={() => removeMethod(step.key || step._id)}
      loading={loading}
    />
  ));

  useEffect(() => {
    if (method.length === 0) {
      addMethod();
    }
  }, [method, addMethod]);

  return (
    <div className={classesList}>
      <label name="Method" className={classes.label}>
        Method*
      </label>
      {methodUI}
      <h6 className={classes.addBtn} onClick={addMethod}>
        + Add another step
      </h6>
    </div>
  );
};

export default MethodForm;
