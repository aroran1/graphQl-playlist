import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

// import Form from '../common/Form';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from '../queries/queries';

class AddBook extends Component {
  constructor(props){
    super(props);

    this.state = {
      name:'',
      genre: '',
      authorId: ''
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  displayAuthors() {
    const data = this.props.getAuthorsQuery;
    const {
      loading,
      authors
    } = data;

    if(loading) {
      return(<option disabled>Loading authors...</option>)
    }
    else if (!loading && authors && authors.length > 0) {
      return authors.map(author => {
        return(
          <option key={author.id} value={author.id}>{author.name}</option>
        )
      });
    }
  }

  handleFormChange(e, fieldName) {
    if (fieldName === 'name'){
      this.setState({
        name: e.target.value
      });
    } else if (fieldName === 'genre') {
      this.setState({
        genre: e.target.value
      });
    } else if (fieldName === 'author') {
      this.setState({
        authorId: e.target.value
      });
    }
  }

  submitForm(e) {
    e.preventDefault();
    // console.log(this.state);
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorId: this.state.authorId
      },
      refetchQueries: [{
        query: getBooksQuery
      }]
    });
  }

  render() {
    console.log(this.props);
    // const { data } = this.props;

    // const formStructure = [
    //   {
    //     type: 'text',
    //     label: 'Book name'
    //   },
    //   {
    //     type: 'text',
    //     label: 'Genre'
    //   },
    //   {
    //     type: 'select',
    //     label: 'Author',
    //     selectItems: data.authors
    //   }
    // ];
    return(
      <div id="add-book">
        <h2>Add a book</h2>
        {/* <Form id="add-books" fieldData={formStructure} /> */}
        <form id={this.props.id} onSubmit={this.submitForm}>
          <div className="field">
            <label>Book name</label>
            <input type="text" onChange={(e) => this.handleFormChange(e, 'name')} />
          </div>

          <div className="field">
            <label>Genre</label>
            <input type="text" onChange={(e) => this.handleFormChange(e, 'genre')} />
          </div>

          <div className="field">
            <label>Author</label>
            <select onChange={(e) => this.handleFormChange(e, 'author')}>
              <option defaultValue value="-1">Select Author</option>
              {this.displayAuthors()}
            </select>
          </div>
          <button>Add book</button>
        </form>
      </div>
    )
  }
}

// use componse for multiple graphQl queries but can use direct graphql if its just 1 query as in BookList
export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);