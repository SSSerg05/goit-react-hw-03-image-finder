import React, {Component} from "react";

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery} from "./ImageGallery/ImageGallery"
import  dataGallery from "../data/gallery.json"
import { Modal } from "./ImageGallery/Modal/Modal";


const URL = 'https://pixabay.com/api/';
const API_KEY = '36214966-0d101d8d6f502ad642532aad3';

export class App extends Component {
  
  state = {
    imagesGallery: dataGallery.hits,
    showModal: false,
    loader: false,
  }

  // відкриття / закриття модалки
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }))
  }

  componentDidMount() { 
    const url = URL + '?api_key=' + API_KEY
    fetch(url)
      .then(res => res.json())
      .then(console.log())
      .then(res => this.setState(({ imagesGallery }) => ({
      imagesGallery: res
    })));
  }


  render() {
    const { imagesGallery, showModal } = this.state; 

    return (
      <div>
        <Searchbar />

        <button type="button" onClick={this.toggleModal}>
          Open
        </button>
        {showModal && (
          <Modal onClose={ this.toggleModal }> 
            <button type="button" onClick={ this.toggleModal }>
              Close
            </button>
          </Modal>
        )}
        <ImageGallery
          gallery={ imagesGallery }
        />
      </div>
    );

  }
};
