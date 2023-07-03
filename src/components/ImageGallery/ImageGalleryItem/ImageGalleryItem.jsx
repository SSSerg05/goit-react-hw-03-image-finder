

export const ImageGalleryItem = ({ id, src, alt }) => { 

  return (
    <div className="gallery-item">
      <img src={ src } alt={ alt } />
    </div>
  );
  
}