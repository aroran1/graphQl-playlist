import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// Components
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import AddAuthor from './components/AddAuthor';

// css
import './css/index.css';

// Client set-up
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App" id="main">
          <h1>GraphQL Reading List</h1>
          <BookList />
          <div id="tools">
            <AddAuthor />
            <AddBook />
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
