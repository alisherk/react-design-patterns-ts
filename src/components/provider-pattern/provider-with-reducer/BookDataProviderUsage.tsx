import React from 'react';
import { BookDataProvider } from './BookDataProvider';
import { Books } from './Books';

export const BookDataProviderUsage = () => (
  <BookDataProvider>
    <Books />
  </BookDataProvider>
);
