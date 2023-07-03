import React, { Component } from "react";
import { boxModal } from "./Modal.slyled";

export class Modal extends Component {
  
  
  render() {
    <div className="overlay">
      <boxModal className="modal">
        <img src={src} alt={alt} />
        {this.props.children}
        
      </boxModal>
    </div>
  };
}