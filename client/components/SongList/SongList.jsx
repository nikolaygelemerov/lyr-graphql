import { memo, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';

import styles from './SongList.scss';

const QUERY = gql`
  query GetSongList {
    songs {
      id
      title
    }
  }
`;

const SongList = () => {
  const { data, loading } = useQuery(QUERY);

  console.log('data: ', data);

  const renderSongs = useCallback(() => {
    if (loading) {
      return <div>...Loading</div>;
    }

    return Array.isArray(data.songs)
      ? data.songs.map((song) => <li key={song.id}>{song.title}</li>)
      : null;
  }, [data, loading]);

  return (
    <div>
      <ul className={styles.SongList}>{renderSongs()}</ul>
      <NavLink className="btn-floating btn-large red right" to="/songs/new">
        <i className="material-icons">add</i>
      </NavLink>
    </div>
  );
};

export default memo(SongList);
