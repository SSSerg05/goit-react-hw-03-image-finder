import { Form } from "./Form/Form";

export const Searchbar = ({ handleFormSubmit }) => { 

  return (
    <header className="searchbar">
      <Form onSubmit={ handleFormSubmit }/>
    </header>
  );
  
}