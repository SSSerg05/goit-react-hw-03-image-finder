import React, { Component } from "react";

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
      const  responce = await fetchData(this.state.searchQuery);
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

//   async componentDidUpdate(prevProps, prevState) {
//     const prevQuery = prevState;
//     const nextQuery = this.state.searchQuery;
//     console.log(prevQuery, nextQuery);

//     if (prevQuery !== nextQuery) {
//       try {
//         this.setState({ isLoading: true });

// //        const responce = await fetchData(this.state.searchQuery); 
// //        this.setState({ imagesGallery: responce.hits });
// //        this.setState({ total: responce.totalHits });
//         this.incrementPage(); 

//       } catch (error) {
//         this.setState({ error: `Server don't repeate. ` + error });
//       }
//       finally {
//         this.setState({ isLoading: false });
//       }
      
//     }
//   }

  incrementPage() {
    this.page++;
  }

  resetPage() { 
    this.page = 1;
    this.total = 0;
  }


  onSelectImage = (link, tags) => { 
    this.setState({
      selectedImage: link,
      tagsSelectedImage: tags,
    });
    this.toggleModal();
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
      <div>
        <Searchbar onSubmit={ this.handleFormSubmit } />

        { isLoading && <h2>Loading...</h2>}
        
        {
          searchQuery && <ListGallery
            gallery={ imagesGallery }
            onSelect={ this.onSelectImage }
            />
        }

        {
          showModal && (
            <Modal
              src={ selectedImage }
              tags={ tagsSelectedImage }
              onClose={ this.toggleModal }
            > 
              <button type="button" onClick={ this.toggleModal }>
                Close
              </button>
            </Modal>
        )}
        
      </div>
    );

  }
};
