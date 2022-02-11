import { gql } from '@apollo/client';

export const FETCH_SONGS_QUERY = gql`
  query GetSongList {
    songs {
      id
      title
    }
  }
`;
