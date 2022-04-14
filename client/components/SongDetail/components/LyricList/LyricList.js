import { memo, useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';

const MUTATION = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

const LyricList = ({ lyrics }) => {
  const [mutateFunction] = useMutation(MUTATION);

  const onLike = useCallback(
    (id, likes) => {
      mutateFunction({
        variables: { id },
        optimisticResponse: {
          __typename: 'Mutation',
          likeLyric: {
            id,
            __typename: 'LyricType',
            likes: ++likes
          }
        }
      });
    },
    [mutateFunction]
  );

  const renderLyrics = useCallback(
    () =>
      lyrics?.map(({ id, content, likes }) => (
        <li key={id} className="collection-item">
          {content}{' '}
          <span>
            <i className="material-icons" onClick={() => onLike(id, likes)}>
              thumb_up
            </i>{' '}
            {likes}
          </span>
        </li>
      )),
    [lyrics, onLike]
  );

  return <ul className="collection">{renderLyrics()}</ul>;
};

export default memo(LyricList);
