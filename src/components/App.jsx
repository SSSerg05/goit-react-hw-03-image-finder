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

  async componentDidMount() {

    //https://pixabay.com/api/?q=cat&key=36214966-0d101d8d6f502ad642532aad3
    try {
      const {searchQuery, page} = this.state;
      this.setState({ isLoading: true });

      const  responce = await fetchData(searchQuery, page);
      console.log(responce.hits);

      this.setState({ imagesGallery: responce.hits, isLoading: false  });
      this.setState({ total: responce.totalHits });
      this.resetPage();

    } catch (error) {
      this.setState({ error: true, isLoading: false });
      console.log(error);
    }
    finally {
      this.setState({ isLoading: false });
    }

  }

  async componentDidUpdate(prevProps, prevState) {
    const { page: prevPage, searchQuery: prevQuery } = prevState;
    const { page: nextPage, searchQuery: nextQuery } = this.state;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      try {
        const {searchQuery, page} = this.state;
        this.setState({ isLoading: true });
        const responce = await fetchData(searchQuery, page); 


        if (prevQuery !== nextQuery) {
          this.resetPage();
          this.setState({ imagesGallery: responce.hits });
        
        } else if (prevPage !== nextPage) {
          
          this.setState(({ imagesGallery }) => ({
            imagesGallery: [ ...this.state.imagesGallery, ...responce.hits ], 
          }));

        }

        this.setState({ total: responce.totalHits });
        
        // this.incrementPage();

      } catch (error) {
        this.setState({ error: `Server don't repeate. ` + error });
      }
      finally {
        this.setState({ isLoading: false });
      }
    }      
  }

  incrementPage() {
    this.setState(prevState => ({ 
      page: prevState.page + 1,
    }))
  }

  resetPage() { 
    this.setState({
      page: 1, total: 0, isLoading: false });
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
