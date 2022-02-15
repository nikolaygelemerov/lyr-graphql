import { memo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import './styles/index.scss';

import { SongCreate, SongDetail, SongList } from '@components';

import styles from './App.scss';

const App = () => {
  return (
    <div className={styles.App}>
      <Routes>
        <Route path="/" element={<SongList />} />
        <Route path="songs/new" element={<SongCreate />} />
        <Route path="songs/:id" element={<SongDetail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default memo(App);
