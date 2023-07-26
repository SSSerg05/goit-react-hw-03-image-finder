import { ItemGallery } from "./ItemGallery/ItemGallery"


export const ListGallery = ({ gallery, onSelect }) => { 


  return (
    <ul className="ImageGallery">
      {
        gallery.map(item =>
          <li key={item.id} onClick={() => onSelect(item.largeImageURL, item.tags)}>
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