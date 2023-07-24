import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem"


export const ImageGallery = ({ gallery }) => { 

  return (
    <ul className="gallery">
      {
        gallery.map(item =>
          <li key={item.id} onClick={() => onselect(item.largeImageURL)}>
            <ImageGalleryItem
              src={item.previewURL}
              alt={item.tags}
            />
            { console.log(item) }
          </li>
        )
      }
    </ul>
  );
}