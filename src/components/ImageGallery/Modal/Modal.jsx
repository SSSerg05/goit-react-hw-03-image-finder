import React, { Component } from "react";
import { createPortal } from "react-dom";

import { BoxModal } from "./Modal.slyled";


const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  
  state = {
    src: "",
    alt: ""
  }

  toggleModal = () => { 
    
  }


  componentDidMount() {
    console.log('Open modal didMount');
  }


  componentWillUnmount() {
    console.log('close modal willUnmount');

  }


  render() {
    const { src, alt } = this.state;
    return createPortal(
      <div className="Overlay">
        <BoxModal>
          its modal window
          
          <img src={src} alt={alt} />

          { this.props.children }
        
          
          <button type="button" onClick={this.toggleModal}>
            Close
          </button>
        </BoxModal>
      </div>
    , modalRoot)
  };
}