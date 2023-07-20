import React, { Component } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ImSearch } from 'react-icons/im';

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
      return toast.error('No search query');
      
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: "" })
  }


  render() { 
    const { searchQuery } = this.state;
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
        
        <button type="submit">
          <ImSearch /> Search
        </button>

        <ToastContainer
          autoClose={2500}
          theme="colored"/>
      </form>
    )
  }
}