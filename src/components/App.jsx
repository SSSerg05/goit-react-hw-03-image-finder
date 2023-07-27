import React, { Component } from "react";

import "../index.css"
import { ListGallery } from "./ImageGallery/ListGallery";
// import  dataGallery from "../data/gallery.json"
import { Searchbar } from "./Searchbar/Searchbar";
import { Modal } from "./Modal/Modal";
import { fetchData } from '../services/Api';


export class App extends Component {
  
  state = {
    imagesGallery: null, // dataGallery.hits,
    searchQuery: null,
    selectedImage: null,
    showModal: false,
    isLoading: false,
    error: null,
    page: 1,
    total: 0,
  }

  // відкриття / закриття модалки
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal
    }))
  }

  componentDidMount() {
    //https://pixabay.com/api/?q=cat&key=36214966-0d101d8d6f502ad642532aad3
    this.resetPage();
  }

  async componentDidUpdate(prevProps, prevState) {
    const { page: prevPage, searchQuery: prevQuery } = prevState;
    const { page: nextPage, searchQuery: nextQuery } = this.state;

    try {
      let responce = null;
      if ( prevQuery !== nextQuery ) {
        this.setState({ isLoading: true });
        responce = await fetchData(nextQuery, nextPage); 

        this.resetPage();
        this.setState({ imagesGallery: responce.hits });
        this.setState({ total: responce.totalHits });
        return;
      }  

      if ( (prevPage !== nextPage) ) {
        this.setState({ isLoading: true });
        responce = await fetchData(nextQuery, nextPage); 

        this.setState(({ imagesGallery }) => ({
          imagesGallery: [ ...prevState.imagesGallery, ...responce.hits ], 
        }));
        
      }

      
    } catch (error) {
      this.setState({ error: `Server don't repeate. ` + error });
      console.log(error);
    }
    finally {
        this.setState({ isLoading: false });
    }
  }

  incrementPage() {
    this.setState(prevState => ({ 
      page: prevState.page + 1,
    }))
  }

  resetPage() { 
    this.setState({
      imagesGallery: [], page: 1, total: 0, isLoading: false });
  }


  onSelectImage = (link, tags) => { 
    this.setState({
      selectedImage: link,
      tagsSelectedImage: tags,
    });
    this.toggleModal();
  }

  onLoadMore = () => {
    this.incrementPage();
  }

  handleFormSubmit = searchQuery => { 
    this.setState({ searchQuery })
  }

  render() {
    const {
      imagesGallery,
      selectedImage,
      tagsSelectedImage,
      showModal,
      isLoading,
      searchQuery,
    } = this.state; 

    return (
      <div className="App">
        <Searchbar onSubmit={ this.handleFormSubmit } />

        {/* { isLoading && <h2>Loading...</h2>} */}
        
        {
          !isLoading && searchQuery && <ListGallery
            gallery={ imagesGallery }
            onSelect={ this.onSelectImage }
            />
        }

        { searchQuery && !isLoading && (
          <button className="Button" type="button" onClick={ this.onLoadMore }>
            Load More
          </button>
            // <Button 
            //   name={"Load More"}
            //   nameDisable={"Loading..."}
            //   isHidden={false}
            // />
        )}

        {
          showModal && (
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
