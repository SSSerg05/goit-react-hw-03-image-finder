import { ItemGallery } from "./ItemGallery/ItemGallery"


export const ListGallery = ({ gallery, onSelect }) => { 


  return (
    <ul className="gallery">
      {
        gallery.map(item =>
          <li key={item.id} onClick={() => onSelect(item.largeImageURL)}>
            <ItemGallery
              src={item.previewURL}
              alt={item.tags}
            />
          </li>
        )
      }
    </ul>
  );
}