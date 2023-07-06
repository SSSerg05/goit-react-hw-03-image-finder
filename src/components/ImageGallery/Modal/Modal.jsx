import React, { Component } from "react";
import { boxModal } from "./Modal.slyled";

export class Modal extends Component {
  
  state = {
    src: "",
    alt: ""
  }
  
  render() {
    const { src, alt } = this.state;
    return(
      <div className="overlay">
        <boxModal className="modal">
          
          <img src={src} alt={alt} />

          { this.props.children }
        
        </boxModal>
      </div>
    )
  };
}