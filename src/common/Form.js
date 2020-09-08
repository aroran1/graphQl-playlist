import React, { Component } from 'react';

class Form extends Component {

  createFields(formData) {
    formData.map(item => {
      if (item.type === 'text') {
        return(
          <div className="field">
            <label>{item.label}</label>
            <input type={item.type} />
          </div>
        )
      } else {
        return(
          <div className="field">
            <label>{item.label}</label>
            <select>
              if (item.selectItems && item.selectItems.length > 0) {
                item.selectItems.map(author => {
                  return(<option>{author.name}</option>)
                })
              } else {
                <option>Loading...</option>
              }
            </select>
          </div>
        )
      }
    });
  }

  render() {
    return(
      <form id={this.props.id}>
        {/* {this.createFields(this.props.fieldData)} */}

        <div className="field">
          <label>Book name</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Genre</label>
          <input type="text" />
        </div>

        <div className="field">
          <label>Author</label>
          <select>
            <option>Loading...</option>
          </select>
        </div>
        <button>Add</button>
      </form>
    )
  }
}

export default Form;