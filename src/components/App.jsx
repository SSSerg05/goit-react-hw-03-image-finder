import React, {Component} from "react";

import { ImageGallery} from "./ImageGallery/ImageGallery"
import  dataGallery from "../data/gallery.json"
import { Modal } from "./ImageGallery/Modal/Modal";

// const URL = 'https://pixabay.com/api/';
// const API_KEY = '36214966-0d101d8d6f502ad642532aad3';

export class App extends Component {
  
  state = {
    imagesGallery: dataGallery.hits,
    showModal: false,
    loader: false,
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }))
  }

  render() {
    const { imagesGallery, showModal } = this.state; 
    console.log(imagesGallery);

    return (
      <div>
        {showModal && <Modal />}
        <ImageGallery
          gallery={imagesGallery}
        />
      </div>
    );

  }
};
