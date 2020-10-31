import React from 'react';
import { BookDataProvider } from './BookDataProvider';
import { Books } from './Books';
import { BookForm } from './BookForm'; 

export const BookDataProviderUsage = () => (
  <BookDataProvider>
    <Books />
    <BookForm />
  </BookDataProvider>
);
