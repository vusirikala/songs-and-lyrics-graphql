import React from 'react';
import ReactDOM from 'react-dom';

//Apollo client is agnostic to the rendering library (react, angular, etc.)
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import SongList from './components/SongList';

// apollo client makes an assumption that the backend uses /grapql endpoint for graphql queries
const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <SongList />
    </ApolloProvider>
  )
};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
