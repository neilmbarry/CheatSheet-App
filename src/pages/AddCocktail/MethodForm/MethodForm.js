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
    const newMethod = [...method, { _id: generateId() }];
    store.dispatch(createCocktailActions.changeMethod(newMethod));
  }, [method]);

  const removeMethod = (id) => {
    const updatedMethod = method.filter((step) => step._id !== id);
    store.dispatch(createCocktailActions.changeMethod(updatedMethod));
  };

  const updateMethod = (info) => {
    const updatedMethod = method.map((step) => {
      console.log(step._id, info.id);
      if (step._id === info.id) {
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
      key={step._id}
      id={step._id}
      index={i}
      updateMethod={(info) => updateMethod(info)}
      removeMethod={() => removeMethod(step._id)}
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
