import { memo, useCallback, useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const MUTATION = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
      }
    }
  }
`;

const LyricCreate = ({ songId }) => {
  const [content, setContent] = useState('');

  const [mutateFunction] = useMutation(MUTATION);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      await mutateFunction({
        variables: { content, songId }
      });

      setContent('');
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
