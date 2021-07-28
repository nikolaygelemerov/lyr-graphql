import { memo } from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import styles from './App.scss';

import { TestCmp } from '@components';

// const client = new ApolloClient({});

const App = () => {
  return (
    <div className={styles.App}>
      <TestCmp />
    </div>
  );
};

export default memo(App);
