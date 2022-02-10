import { memo, useCallback, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';

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

  const [mutateFunction, { data, loading, error }] = useMutation(MUTATION);

  useEffect(() => {
    if (data) {
      navigate('/');
    }
  }, [data, navigate]);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      mutateFunction({ variables: { title } });
    },
    [mutateFunction, title]
  );

  return (
    <div>
      <NavLink className="btn-floating btn-large green left" to="/">
        back
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
