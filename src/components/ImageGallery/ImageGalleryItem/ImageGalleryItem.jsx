

export const ImageGalleryItem = ({ id, src, alt }) => { 

  return (
    <li class="gallery-item" key={ id }>
      <img src={ src } alt={ alt } />
    </li>
  );
  
}