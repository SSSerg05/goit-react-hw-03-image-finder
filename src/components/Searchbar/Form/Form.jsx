import React, { Component } from "react";


export class Form extends Component { 
  state = {
    strSearch : "",
  }


  onSubmit = () => { 
    this.state.strSearch = ""
    console.log("Строка пошуку");
  }


  render() { 
    return (
      <form className="form">
          <input
            className="input"
            type="text"
            name="strSearch"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        
        <button type="submit" class="button">
          <span className="button-label" onSubmit={this.onSubmit}>Search</span>
        </button>
      </form>
    )
  }
}