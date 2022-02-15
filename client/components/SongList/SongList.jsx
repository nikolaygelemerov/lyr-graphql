import { memo, useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { gql, useMutation, useQuery } from '@apollo/client';

import { FETCH_SONGS_QUERY } from '../../queries';

import styles from './SongList.scss';

const DELETE_SONG_MUTATION = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

const SongList = () => {
  const { data, loading, refetch } = useQuery(FETCH_SONGS_QUERY);

  const [
    mutateFunction,
    { data: deleSongData, loading: deleteSonLoading, error: deleteSongError }
  ] = useMutation(DELETE_SONG_MUTATION);

  const onSongDelete = useCallback(
    (id) => {
      mutateFunction({
        variables: { id }
      });
    },
    [mutateFunction]
  );

  const renderSongs = useCallback(() => {
    if (loading) {
      return <div>...Loading</div>;
    }

    return Array.isArray(data.songs)
      ? data.songs.map((song) => (
          <li key={song.id}>
            <NavLink to={`songs/${song.id}`}>{song.title}</NavLink>
            <i
              className="material-icons"
              onClick={() => {
                onSongDelete(song.id);
              }}
            >
              delete
            </i>
          </li>
        ))
      : null;
  }, [data?.songs, loading, onSongDelete]);

  useEffect(() => {
    if (deleSongData) {
      refetch();
    }
  }, [deleSongData, refetch]);

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
