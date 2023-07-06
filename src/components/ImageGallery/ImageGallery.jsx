import { ImageGalleryItem } from "./ImageGalleryItem/ImageGalleryItem"


export const ImageGallery = ({ gallery }) => { 
  const {id, previewWidth, tags} = gallery


  return (
    <ul className="gallery">
      {
        gallery.map(item => 
          <li key={id}>
            <ImageGalleryItem
              id={id}
              src={previewWidth}
              alt={tags}
            />
          </li>
        )
      }
    </ul>
  );
}