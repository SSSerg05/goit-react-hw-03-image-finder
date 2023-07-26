import React, { Component } from "react";

import "../index.css"
import { ListGallery } from "./ImageGallery/ListGallery";
// import  dataGallery from "../data/gallery.json"
import { Searchbar } from "./Searchbar/Searchbar";
import { Modal } from "./Modal/Modal";
import { fetchData } from '../services/API';
// import Button from "./Button/Button";


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
    const prevPage = prevState.page;
    const nextPage = this.state.page;
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      try {
        const {searchQuery, page} = this.state;
        this.setState({ isLoading: true });
        const responce = await fetchData(searchQuery, page); 


        if (prevQuery !== nextQuery) {
        
          this.setState({ imagesGallery: responce.hits });
        
        } else if (prevPage !== nextPage) {
          
          this.setState(({ imagesGallery }) => ({
            imagesGallery: [...imagesGallery, responce.hits ], 
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
    const newPage = this.state.page + 1;
    this.setState({ page: newPage });
  }

  resetPage() { 
    this.setState({page: 1})
    this.setState({total: 0})
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

        { isLoading && <h2>Loading...</h2>}
        
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
