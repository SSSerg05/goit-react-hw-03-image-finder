
export const Modal = ({src, alt }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <img src={ src } alt={ alt } />
      </div>
    </div>
  );
}