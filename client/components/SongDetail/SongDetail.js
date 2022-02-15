import { memo } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { FETCH_SONG_QUERY } from '../../queries';

import LyricCreate from '../LyricCreate/LyricCreate';

const SongDetail = () => {
  const params = useParams();

  const { data, loading, refetch } = useQuery(FETCH_SONG_QUERY, {
    variables: { id: params.id }
  });

  return (
    <div>
      <NavLink className="btn-floating btn-large blue right" to="/">
        Back
      </NavLink>
      {data?.song ? <h3>{data?.song.title}</h3> : 'Loading...'}
      <LyricCreate songId={params.id} />
    </div>
  );
};

export default memo(SongDetail);
