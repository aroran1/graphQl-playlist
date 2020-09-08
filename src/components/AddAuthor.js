import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';

import {
  // getAuthorsQuery,
  addAuthorMutation,
  getBooksQuery
} from '../queries/queries';

class AddAuthor extends Component {
  constructor(props){
    super(props);

    this.state = {
      name:'',
      age: null
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  handleFormChange(e, fieldName) {
    if (fieldName === 'name'){
      this.setState({
        name: e.target.value
      });
    } else if (fieldName === 'age') {
      this.setState({
        age: Number(e.target.value)
      });
    }
  }

  submitForm(e) {
    e.preventDefault();
    console.log(this.state);
    this.props.addAuthorMutation({
      variables: {
        name: this.state.name,
        age: Number(this.state.age)
      },
      refetchQueries: [{
        query: getBooksQuery
      }]
    });
  }

  render() {
    return(
      <div id="add-author">
        <h2>Add an author</h2>
        <form id={this.props.id} onSubmit={this.submitForm}>
          <div className="field">
            <label>Author name</label>
            <input type="text" onChange={(e) => this.handleFormChange(e, 'name')} />
          </div>

          <div className="field">
            <label>age</label>
            <input type="text" onChange={(e) => this.handleFormChange(e, 'age')} />
          </div>
          <button>Add author</button>
        </form>
      </div>
    )
  }
}

// use componse for multiple graphQl queries but can use direct graphql if its just 1 query as in BookList
export default compose(
  // graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addAuthorMutation, {
    name: "addAuthorMutation"
  })
)(AddAuthor);