import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem"


export const ImageGallery = ({ gallery, onSelect }) => { 


  return (
    <ul className="gallery">
      {
        gallery.map(item =>
          <li key={item.id} onClick={() => onSelect(item.largeImageURL)}>
            <ImageGalleryItem
              src={item.previewURL}
              alt={item.tags}
            />
          </li>
        )
      }
    </ul>
  );
}