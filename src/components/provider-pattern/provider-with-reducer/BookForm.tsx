import React, { useState } from 'react';
import { useBookDataContext, ActionTypes } from './BookDataProvider';


export const BookForm = () => {
  const { dispatch } = useBookDataContext();
  const [value, setValue] = useState(''); 

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {  
     setValue(event.target.value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    dispatch({ type: ActionTypes.ADD, book: { id: Math.random(), description: value, title: 'my book' }})
  }

  return (
    <form onSubmit={handleSubmit}>
      <input  onChange={handleChange} />
      <button> Submit</button>
    </form>
  );
};
