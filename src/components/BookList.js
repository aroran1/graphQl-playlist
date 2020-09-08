import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

// components
import BookDetails from './BookDetails';

class BookList extends Component {
  constructor(props){
    super(props);

    this.state = {
      selected: null
    };
  }

  displayBooks() {
    const data = this.props.data;
    const {
      loading,
      books
    } = data;

    if(loading) {
      return(<div>Loading books...</div>)
    }
    else if (!loading && books && books.length > 0) {
      return books.map(book => {
        return(<li key={book.id} onClick={(e) => this.handleClick(book.id)}>{book.name}</li>)
      });
    }
  }

  handleClick(id) {
    this.setState({
      selected: id
    });
  }

  render() {
    console.log(this.props);
    return(
      <div>
        <ul id="book-list">
          {this.displayBooks()}
        </ul>
        <BookDetails bookId={this.state.selected} />
      </div>
    )
  }
}

export default graphql(getBooksQuery)(BookList);