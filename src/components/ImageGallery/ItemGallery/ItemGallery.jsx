

export const ItemGallery = ({ src, alt }) => { 

  return (
    <div className="ImageGalleryItem">
      <img className="ImageGalleryItem-image" src={ src } alt={ alt } loading="lazy"/>
    </div>
  );
  
}