

export const ImageGalleryItem = ({ src, alt }) => { 

  return (
    <div className="gallery-item">
      <img src={ src } alt={ alt } />
    </div>
  );
  
}