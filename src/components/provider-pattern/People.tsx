import React from 'react';
import { usePeopleProviderState } from './PeopleDataProvider';
import Person from './Person';

const People = () => {
  const { data } = usePeopleProviderState();
  return (
    <>
      {data?.map((person) => (
        <Person key={person.id} {...person} />
      ))}
    </>
  );
};

export default People;
