import React, { memo } from 'react';
import { useBookDataContext } from './BookDataProvider';

export const Books = memo((): JSX.Element => {
  const { state, dispatch } = useBookDataContext();
  return (
    <>
      {state.data?.map((book) => (
        <p key={book.id}>
          {book.title} {book.description}{' '}
        </p>
      ))}
    </>
  );
});
