import { memo, useCallback, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

import { FETCH_SONGS_QUERY } from '../../queries';

const MUTATION = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

const SongCreate = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');

  const [mutateFunction, { data }] = useMutation(MUTATION);

  useEffect(() => {
    if (data) {
      navigate('/');
    }
  }, [data, navigate]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      mutateFunction({
        variables: { title },
        refetchQueries: [{ query: FETCH_SONGS_QUERY }]
      });
    },
    [mutateFunction, title]
  );

  return (
    <div>
      <NavLink className="btn-floating btn-large green right" to="/">
        backssdsd
      </NavLink>
      <h3>Create new Song</h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="title">Song Title:</label>
        <input
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </form>
    </div>
  );
};

export default memo(SongCreate);
