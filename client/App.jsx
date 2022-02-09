import { memo } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import './styles/index.scss';

import { SongCreate, SongList } from '@components';

import styles from './App.scss';

const App = () => {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<SongList />} />
        <Route path="/song/new" element={<SongCreate />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default memo(App);
