import React from 'react';
import PeopleDataProvider from './PeopleDataProvider';
import People from './People';

export const PeopleDataProviderUsage = () => {
  return (
    <PeopleDataProvider>
      <People />
    </PeopleDataProvider>
  );
};


