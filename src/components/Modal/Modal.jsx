import React, { Component } from "react";
import { ColorRing } from "react-loader-spinner";
import { createPortal } from "react-dom";
// import axios from "axios";


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
        throw new Error("Network response was not OK");
      }

      const myBlob = await response.blob();

      this.setState({ source: URL.createObjectURL(myBlob) });

    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error);
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


  render() {
    const { tags } = this.props;
    const { isLoading, source } = this.state;
    
    return createPortal(
      <div className="Overlay" onClick={ this.handleBackdropClick }>
       
        <div className="BoxModal">

          { isLoading && <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
              />
          }
          
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