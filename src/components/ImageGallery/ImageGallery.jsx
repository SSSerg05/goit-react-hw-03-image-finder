import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem"


export const ImageGallery = ({ gallery }) => { 

  return (
    <ul className="gallery">
      {
        gallery.map(item =>
          <ImageGalleryItem
            id={ gallery.id }
            src={ gallery.previewWidth }
            alt={ gallery.tags }
          />)
      }
    </ul>
  );
  
}