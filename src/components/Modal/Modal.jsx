import React, { Component } from "react";
import { createPortal } from "react-dom";

import { Loader } from "components/Loader/Loader";


const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  
  state = {
    isLoading: null,
    source: "",
  }

  componentDidMount() {

    // this.setState({ isVisible: true });
    window.addEventListener('keydown', this.handleKeyDown);

    this.setState({ source: this.loadLargeImage()});
  }

  loadLargeImage = async () => {
    this.setState({ isLoading: true });

    try {
      const response = await fetch(this.props.src);
      
      if (!response.ok) {
        throw this.onError(new Error("Network response was not OK"));
      }

      const myBlob = await response.blob();

      this.setState({ source: URL.createObjectURL(myBlob) });

    } catch (error) {
      this.onError("There has been a problem with your fetch operation:", error);
    } finally {
      this.setState({isLoading: false});
    }

    // fetch('https://images.unsplash.com/photo-1490730141103-6cac27aaab94')
    // .then(response => response.blob())
    // .then((image) => {
    //   setUrl(URL.createObjectURL(image));
    // });
   
  }


  componentWillUnmount() {
    // console.log('close modal willUnmount');
    window.removeEventListener('keydown', this.handleKeyDown)
    this.setState({ isLoading: null, isVisible: null });
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

  onError = (error) => {
    console.log(error);
  }


  render() {
    const { tags } = this.props;
    const { isLoading, source } = this.state;
    
    return createPortal(
      <div className="Overlay" onClick={ this.handleBackdropClick }>
       
        <div className="BoxModal">

          { isLoading && <Loader /> }
          
          { !isLoading && <img className="Modal-image" src={ source } alt={ tags } /> }
          
          { !isLoading && this.props.children }
          
          { !isLoading && 
            <div className="Modal-title">
              { tags }
            </div>
          }
        </div>
        
      </div>
    , modalRoot)
  };
}