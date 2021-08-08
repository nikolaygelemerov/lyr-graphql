import { memo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import './styles/index.scss';

import { SongCreate, SongList } from '@components';

import styles from './App.scss';

const App = () => {
  return (
    <div className={styles.App}>
      <Switch>
        <Route path="/" exact component={SongList} />
        <Route path="/song/new" exact component={SongCreate} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default memo(App);
