import React, { Component } from "react";
import { createPortal } from "react-dom";

import { BoxModal } from "./Modal.slyled";


const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  
  state = {
    src: "",
    alt: ""
  }

  componentDidMount() {
    // console.log('Open modal didMount');
    window.addEventListener('keydown', this.handleKeyDown)

  }


  componentWillUnmount() {
    // console.log('close modal willUnmount');
    window.removeEventListener('keydown', this.handleKeyDown)
  }


    // close modal for press in ESC
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      // console.log("You press ESC");
      this.props.onClose();
    }
  }

  
  // close modal for click in backdrop
  handleBackdropClick = e => { 
    if (e.currentTarget === e.target) { 
       this.props.onClose();
    }
  }


  render() {
    const { src, alt } = this.state;
    return createPortal(
      <div className="Overlay" onClick={ this.handleBackdropClick }>
        <BoxModal>
          its modal window
          
          <img src={src} alt={alt} />

          { this.props.children }
        
        </BoxModal>
      </div>
    , modalRoot)
  };
}