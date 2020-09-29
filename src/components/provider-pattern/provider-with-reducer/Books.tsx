import React, { memo } from 'react';
import { useBookDataContext } from './BookDataProvider';

export const Books = memo((): JSX.Element => {
  const { state } = useBookDataContext();
  return (
    <div>
      {state.books?.map((book) => (
        <p key={book.id}>
          {book.title} {book.description}{' '}
        </p>
      ))}
    </div>
  );
});
