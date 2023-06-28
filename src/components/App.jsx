import React, {Component} from "react";

import { ImageGallery} from "./ImageGallery/ImageGallery"
import  dataGallery from "../data/gallery.json"

const URL = 'https://pixabay.com/api/';
const API_KEY = '36214966-0d101d8d6f502ad642532aad3';

export class App extends Component {
  
  state = {
    imagesGalery: dataGallery.hits,
    showModal: false,
    loader: false,
  }

  render() {
    const { imagesGalery } = this.state; 

    return (
      <div>
        <ImageGallery
          gallery={imagesGalery}
        />
      </div>
    );

  }
};
