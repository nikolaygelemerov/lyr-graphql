import { memo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { FETCH_SONG_QUERY } from '../../queries';

const SongDetail = () => {
  const params = useParams();

  const { data, loading, refetch } = useQuery(FETCH_SONG_QUERY, {
    variables: { id: params.id }
  });

  console.log('data: ', data);

  return (
    <div>
      <h3>Song Details</h3>
    </div>
  );
};

export default memo(SongDetail);
