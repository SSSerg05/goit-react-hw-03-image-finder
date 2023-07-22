import React, { Component } from "react";

import { ImageGallery} from "./ImageGallery/ImageGallery"
//import  dataGallery from "../data/gallery.json"
import { Searchbar } from "./Searchbar/Searchbar";
import { Modal } from "./ImageGallery/Modal/Modal";
import { fetchData } from '../services/Api';


export class App extends Component {
  
  state = {
    imagesGallery: null, // dataGallery.hits,
    searchQuery: null,
    showModal: false,
    isLoading: false,
    error: null,
    page: 0,
    total: 0,
  }

  // відкриття / закриття модалки
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }))
  }

  async componentDidMount() {

    //https://pixabay.com/api/?q=cat&key=36214966-0d101d8d6f502ad642532aad3
    try {

      const responce = await fetchData(this.state.searchQuery);
      console.log(responce.hits);
      this.setState({ imagesGallery: responce.hits });
      this.setState({ total: responce.totalHits });
      this.incrementPage();

    } catch (error) {
      this.setState({ error: `Server don't repeate. ` + error });
    }
    finally {
      this.setState({ isLoading: false });

    }

  }

  async componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      try {
        this.setState({ isLoading: true });

        const responce = await fetchData(this.state.searchQuery); 
        this.setState({ imagesGallery: responce.hits });
        this.setState({ total: responce.totalHits });
        this.incrementPage(); 

      } catch (error) {
        this.setState({ error: `Server don't repeate. ` + error });
      }
      finally {
        this.setState({ isLoading: false });
      }
      
    }
  }

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
    const { imagesGallery, showModal, isLoading, searchQuery } = this.state; 

    return (
      <div>
        <Searchbar onSubmit={ this.handleFormSubmit } />

        {/* <button type="button" onClick={this.toggleModal}>
          Open
        </button> */}
        
        { isLoading && <h2>Loading...</h2>}
        
        { searchQuery && <ImageGallery
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
