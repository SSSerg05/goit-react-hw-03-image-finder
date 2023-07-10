import React, {Component} from "react";

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery} from "./ImageGallery/ImageGallery"
import  dataGallery from "../data/gallery.json"
import { Modal } from "./ImageGallery/Modal/Modal";

// import axios = from "axios/dist/axios.min.js"; // node

const URL = 'https://pixabay.com/api/';
const API_KEY = '36214966-0d101d8d6f502ad642532aad3';

export class App extends Component {
  
  state = {
    imagesGallery: dataGallery.hits,
    showModal: false,
    loader: false,
    page: 0,
    total: 0,
  }

  // відкриття / закриття модалки
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }))
  }

  componentDidMount() { 
    const url = URL + '?key=' + API_KEY + '&q=cat';
    console.log(url);
    //https://pixabay.com/api/?q=cat&key=36214966-0d101d8d6f502ad642532aad3
    fetch(url)
      .then(res => res.json())
      .then(console.log());
  }
      // .then(res => this.setState(({ imagesGallery }) => ({
      //   imagesGallery: res
      // })))
  
  // async getPictures() {
    
  //   const params = {
  //     key: API_KEY,
  //     q: this.searchQuery,
  //     image_type: 'photo',
  //     orientation: 'horizontal',
  //     safesearch: true,
  //     page: this.page,
  //     per_page: this.perPage,
  //   }

  //   const { data } = await axios.get(URL, { params })
  //   this.incrementPage();
  //   this.total = data.totalHits;

  //   return data.hits;
  // }

  incrementPage() {
    this.page++;
  }

  resetPage() { 
    this.page = 1;
    this.total = 0;
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
