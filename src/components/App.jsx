import React, { Component } from "react";
import { ToastContainer } from "react-toastify" 
import axios from 'axios';

import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery} from "./ImageGallery/ImageGallery"
import  dataGallery from "../data/gallery.json"
import { Modal } from "./ImageGallery/Modal/Modal";


// import axios = from "axios/dist/axios.min.js"; // node

const URL = 'https://pixabay.com/api/';
const API_KEY = '36214966-0d101d8d6f502ad642532aad3';

export class App extends Component {
  
  state = {
    imagesGallery: null, // dataGallery.hits,
    showModal: false,
    loading: false,
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
      .then(imagesGallery => this.setState({ imagesGallery }))
             
      .finally(() => this.setState({ loading: false }));
  }
  
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

  handleFormSubmit = searchQuery => { 
    this.setState({ searchQuery })
  }

  render() {
    const { imagesGallery, showModal, loading } = this.state; 

    return (
      <div>
        <Searchbar onSubmit={ this.handleFormSubmit } />

        {/* <button type="button" onClick={this.toggleModal}>
          Open
        </button> */}
        
        {loading && <h2>Loading</h2>}
        
        {imagesGallery && <ImageGallery
            gallery={ imagesGallery }
          />
        }

        {showModal && (
          <Modal onClose={ this.toggleModal }> 
            <button type="button" onClick={ this.toggleModal }>
              Close
            </button>
          </Modal>
        )}
      </div>
    );

  }
};
