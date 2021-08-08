import { memo, useCallback } from 'react';
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

  const renderSongs = useCallback(() => {
    if (loading) {
      return <div>...Loading</div>;
    }

    return Array.isArray(data.songs)
      ? data.songs.map((song) => <li key={song.id}>{song.title}</li>)
      : null;
  }, [data, loading]);

  return <ul className={styles.SongList}>{renderSongs()}</ul>;
};

export default memo(SongList);
