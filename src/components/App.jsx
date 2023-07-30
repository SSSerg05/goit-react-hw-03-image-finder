import React, { Component } from "react";

import "../index.css"
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { toast } from 'react-toastify';
// import  dataGallery from "../data/gallery.json"
import { Searchbar } from "./Searchbar/Searchbar";
import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";
import { fetchData } from '../services/Api';


export class App extends Component {
  
  state = {
    imagesGallery: [], // dataGallery.hits,
    searchQuery: null,
    selectedImage: null,
    showModal: false,
    isLoading: false,
    error: null,
    page: 1,
    total: 0,
  }


  async componentDidUpdate(prevProps, prevState) {
    const { page: prevPage, searchQuery: prevQuery } = prevState;
    const { page: nextPage, searchQuery: nextQuery, searchQuery, page, error } = this.state;

    // console.log(prevQuery, nextQuery, prevPage, nextPage);
    if (prevQuery !== nextQuery || prevPage !== nextPage) {

      this.setState({ isLoading: true, error: null });

      try {
        const data = await fetchData(searchQuery, page); 
        this.setState({ total: data.totalHits });

        if (!data.hits.length) {
          this.setState({ imagesGallery: data });
          throw new Error("Gallery empty");
        }

        this.setState(({ prevState }) => ({
          imagesGallery: [...prevState.imagesGallery, ...data.hits]
        }));

      } catch (error) {
        this.setState({ error: error.message });
      }
      finally {
        this.setState({ isLoading: false });
      }

      if(prevState.error !== error && error) {
        this.onError(error);
      }


    }  
  }

  onSelectImage = (link, tags) => { 
    this.setState({
      selectedImage: link,
      tagsSelectedImage: tags,
    });
    this.toggleModal();
  }


  onLoadMore = () => {
    this.setState(prevState => ({ 
      page: prevState.page + 1,
    }))
  }


  onError = (error) => {
    toast.error(error);
    console.log(error);
  }


  handleFormSubmit = searchQuery => { 
    this.setState({ searchQuery, imagesGallery: [], page: 1, total: 0 })
  }

  // відкриття / закриття модалки
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }))
  }

  render() {
    const {
      imagesGallery,
      selectedImage,
      tagsSelectedImage,
      showModal,
      isLoading,
      searchQuery,
      error,
    } = this.state; 

    return (
      <div className="App">
      
        <Searchbar onSubmit={ this.handleFormSubmit } />

        { isLoading && <Loader/> }
        { error && <div>{ error }</div> }


        { imagesGallery.length && <ImageGallery
            gallery={ imagesGallery }
            onSelect={ this.onSelectImage }
            />
        }


        { !error && searchQuery && imagesGallery.length > 0 && (
          <button className="Button" type="button" onClick={ this.onLoadMore }>
            { isLoading ? 'Loading...' : 'Load More' }
          </button>
        )}


        { showModal && (
            <Modal
              src={ selectedImage }
              tags={ tagsSelectedImage }
              onClose={ this.toggleModal }
            > 
              <button className="Modal-button-close" type="button" onClick={ this.toggleModal }>
                Close
              </button>
            </Modal>
        )}
        
      </div>
    );

  }
};
