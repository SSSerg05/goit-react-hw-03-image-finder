import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem"


export const ImageGallery = ({ gallery }) => { 

  return (
    <ul className="gallery">
      {
        gallery.map(item => 
          <li key={item.id}>
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