import { memo, useCallback, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const MUTATION = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        content
      }
    }
  }
`;

const LyricCreate = ({ songId }) => {
  const [content, setContent] = useState('');

  const [mutateFunction, { data, loading, error }] = useMutation(MUTATION);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      mutateFunction({
        variables: { content, songId }
      });
    },
    [content, mutateFunction, songId]
  );

  return (
    <form onSubmit={onSubmit}>
      <label>Add a Lyric</label>
      <input
        onChange={(event) => {
          setContent(event.target.value);
        }}
        type="text"
        value={content}
      />
    </form>
  );
};

export default memo(LyricCreate);
