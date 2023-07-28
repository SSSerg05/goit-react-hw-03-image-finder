import React, { Component } from "react";
import { ColorRing } from "react-loader-spinner";
import { createPortal } from "react-dom";


const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  
  state = {
    isLoading: null,
    isVisible: null,
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    // this.setState({ isVisible: true });
    window.addEventListener('keydown', this.handleKeyDown);
  }


  componentWillUnmount() {
    // console.log('close modal willUnmount');
    window.removeEventListener('keydown', this.handleKeyDown)
    this.setState({ isLoading: null, isVisible: null });
  }


  componentDidUpdate(prevProps, prevState) {
    const oldLoading = prevState.isLoading;
    const nextLoading = this.state.isLoading;

    console.log(oldLoading, nextLoading, prevState.isVisible, this.state.isVisible);
    
    if(oldLoading !== nextLoading) {
      this.setState({ isVisible: true });
      this.setState({ isLoading: false });
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
    const { isLoading, isVisible } = this.state;
    
    return createPortal(
      <div className="Overlay" onClick={ this.handleBackdropClick }>
       
        <div className="BoxModal">

          { isLoading && <p>Loading...</p> }
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
          
          <img className="Modal-image" src={ src } alt={ tags } />
          
          { !isLoading && isVisible && this.props.children }
          
          { !isLoading && isVisible && 
            <div className="Modal-title">
              { tags }
            </div>
          }
        </div>
        
      </div>
    , modalRoot)
  };
}