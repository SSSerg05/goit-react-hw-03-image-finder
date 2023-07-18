import React, { Component } from "react";
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify'

export class Form extends Component { 
  state = {
    searchQuery : "",
  }


  handleChangeSearchQuery = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() })
  }


  handleSubmit = event => { 
    event.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      alert('No search query')
      return;
    }

    this.props.onSubmit.state.searchQuery;
    this.state.setState({ searchQuery: "" })
  }


  render() { 
    const { query } = this.state;
    return (
      <form className="form" onSubmit={ this.handleSubmit }>
          <input
            className="input"
            type="text"
            name="searchQuery"
            value={ searchQuery }
            onChange={ this.handleChangeSearchQuery }
            // autocomplete="off"
            // autofocus
            placeholder="Search images and photos"
          />
        
        <button type="submit" className="button">
          <ImSearch />
          {/* <span className="button-label" onSubmit={this.handleSubmit}>Search</span> */}
        </button>
      </form>
    )
  }
}