import React from 'react';
import classes from './Account.module.css';
import Tile from '../../components/UI/Tile/Tile';
import LabelInput from '../AddCocktail/LabelInput/LabelInput';
import Button from '../../components/UI/Button';
import store from '../../store/store';
import configActions from '../../store/configSlice';
import { useHistory } from 'react-router';

const Account = ({ className }) => {
  const classesList = `${classes.main} ${className}`;
  const history = useHistory();
  const signOut = () => {
    store.dispatch(configActions.signOut());
    history.push('/');
  };
  return (
    <div className={classesList}>
      <Tile title="Account">
        <LabelInput
          label="Email address"
          name="Email address"
          placeholder="neil@gmail.com"
          updateValue={(name) => null}
          defaultValue={null}
        />
        <LabelInput
          label="Email address"
          name="Name"
          placeholder="Neil"
          updateValue={(name) => null}
          defaultValue={null}
        />
        <LabelInput
          label="Email address"
          name="Password"
          placeholder="Neil"
          updateValue={(name) => null}
          defaultValue={null}
        />
        <div className={classes.btnContainer}>
          <Button type="main" onClick={signOut}>
            Sign Out
          </Button>
          <Button type="alt" onClick={() => null}>
            Delete Account
          </Button>
        </div>
      </Tile>
    </div>
  );
};

export default Account;
