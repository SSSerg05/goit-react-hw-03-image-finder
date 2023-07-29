import React, { Component } from "react";
import { ColorRing } from "react-loader-spinner";

import "../index.css"
import { ListGallery } from "./ImageGallery/ListGallery";
// import  dataGallery from "../data/gallery.json"
import { Searchbar } from "./Searchbar/Searchbar";
import { Modal } from "./Modal/Modal";
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

    // console.log(prevQuery, nextQuery, prevPage, nextPage);
    if (prevQuery !== nextQuery) {
      try {
        const data = await this.updateData(nextQuery, nextPage); 

        this.resetPage();

        if (data.length > 0) {
          this.setState({ imagesGallery: data });
        }
      } catch (error) {
        
      }
    }  

    if ((prevPage !== nextPage)) {
      try {
        const data = await this.updateData (nextQuery, nextPage);

        if (data.length > 0) {
          this.setState(({ imagesGallery }) => ({
            imagesGallery: [...this.state.imagesGallery, ...data],
          }));
        }

      } catch (error) {
        
      }
    }
  }


  async updateData(query, page) { 
    let responce = [];
    try {

      this.setState({ isLoading: true });
    
      responce = await fetchData(query, page); 
      this.setState({ total: responce.totalHits });

      if (responce.hits.length === 0) {
        this.setState({ error: `Gallery empty` });
        throw new Error("Gallery empty");
      }

      return responce.hits;

    } catch (error) {
      this.setState({ error: `Server don't repeate. ` + error });
      console.log(error);      
    }
    finally {
      this.setState({ isLoading: false });
    }

    return responce;
  }


  incrementPage() {
    this.setState(prevState => ({ 
      page: prevState.page + 1,
    }))
  }

  resetPage() { 
    this.setState({
      imagesGallery: [], 
      page: 1, 
      total: 0, 
      isLoading: false, 
      error: null,
    });
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
      error,
    } = this.state; 

    return (
      <div className="App">
        <Searchbar onSubmit={ this.handleFormSubmit } />

         { isLoading && <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{margin: "0 auto"}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        }

        
        { !isLoading && searchQuery && <ListGallery
            gallery={ imagesGallery }
            onSelect={ this.onSelectImage }
            />
        }
        {error && <div>{error}</div>}

        { searchQuery && imagesGallery.length > 0 && (
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
