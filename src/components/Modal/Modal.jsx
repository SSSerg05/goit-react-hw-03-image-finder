import React, { Component } from "react";
import { createPortal } from "react-dom";

import { BoxModal } from "./Modal.slyled";


const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  
  state = {
    isLoading: false,
  }

  componentDidMount() {
    // console.log('Open modal didMount');
    this.setState({ isLoading: true });
    window.addEventListener('keydown', this.handleKeyDown);
    this.setState({ isLoading: false });
  }


  componentWillUnmount() {
    // console.log('close modal willUnmount');
    window.removeEventListener('keydown', this.handleKeyDown)
  }


  componentDidUpdate(prevProps, prevState) {
    const oldProps = prevProps.src;
    const nextProps = this.props.src;
    console.log('oldProps', oldProps);
    console.log('nextProps',nextProps);

    if(prevProps.src !== this.props.src) {
      this.setState({ isLoading : false });
    }
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
    const { src, tags } = this.props;
    const { isLoading } = this.state;
    
    return createPortal(
      <div className="Overlay" onClick={ this.handleBackdropClick }>
       
        <BoxModal>

          { isLoading && <p>Loading...</p> }
          
          <img src={ src } alt={ tags } />
          
          { !isLoading && this.props.children }
          
          <p>{ !isLoading && tags }</p>
        
        </BoxModal>
        
      </div>
    , modalRoot)
  };
}